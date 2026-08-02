import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { RuntimeService, TabsService } from '@plopdown/browser-ref';
import { MockLoggerModule } from '@plopdown/logger/mock';

import { MessagesService } from './messages.service';
import { BackgroundPubService } from './background/background-pub.service';
import { BackgroundSubService } from './background/background-sub.service';
import { BackgroundStatus } from './background/background.model';

/**
 * End-to-end coverage for the command bus.
 *
 * The sibling specs only assert that each service constructs, which cannot
 * detect a bus that has stopped delivering. This wires a publisher to a
 * subscriber through a stand-in for the browser -- whatever
 * runtime.sendMessage is handed comes back out of runtime.getOnMessage --
 * so a published command has to travel the real path through
 * PortPublisher, MessagesService and PortSubscriber to arrive.
 *
 * It exists because the RxJS 6 to 7 move can break delivery silently:
 * share, forkJoin and subscription timing all changed, and a bus that
 * stops carrying messages throws nothing.
 */
describe('message bus delivery', () => {
  let browserWire: Subject<Record<string, unknown>>;
  let runtimeSendMessage: jest.Mock;
  let tabsSendMessage: jest.Mock;

  beforeEach(() => {
    browserWire = new Subject<Record<string, unknown>>();

    // Stands in for the browser: anything published is redelivered to listeners.
    runtimeSendMessage = jest.fn((message: Record<string, unknown>) => {
      browserWire.next(message);
      return of(null);
    });
    tabsSendMessage = jest.fn(() => of(null));

    TestBed.configureTestingModule({
      imports: [MockLoggerModule],
      providers: [
        MessagesService,
        BackgroundPubService,
        BackgroundSubService,
        {
          provide: RuntimeService,
          useValue: {
            getOnMessage: (): Observable<Record<string, unknown>> =>
              browserWire.asObservable(),
            sendMessage: runtimeSendMessage,
          },
        },
        { provide: TabsService, useValue: { sendMessage: tabsSendMessage } },
      ],
    });
  });

  const status: BackgroundStatus = {
    active_allowed: true,
    active_origin: 'https://example.com',
  };

  it('delivers a published command to a subscriber of that command', () => {
    const sub = TestBed.inject(BackgroundSubService);
    const pub = TestBed.inject(BackgroundPubService);

    const received: BackgroundStatus[] = [];
    sub.getStatus().subscribe((command) => received.push(command.args[0]));

    pub.publishStatus(status);

    expect(received).toEqual([status]);
  });

  it('stamps the source so subscribers of other sources ignore it', () => {
    const sub = TestBed.inject(BackgroundSubService);
    const pub = TestBed.inject(BackgroundPubService);

    const sources: unknown[] = [];
    sub.getStatus().subscribe((command) => sources.push(command.source));

    pub.publishStatus(status);

    expect(sources).toEqual(['BACKGROUND']);
  });

  it('fans out over both runtime and tabs', () => {
    const pub = TestBed.inject(BackgroundPubService);

    pub.publishStatus(status);

    expect(runtimeSendMessage).toHaveBeenCalledTimes(1);
    expect(tabsSendMessage).toHaveBeenCalledTimes(1);
    expect(runtimeSendMessage.mock.calls[0][0]).toMatchObject({
      command: 'BG_STATUS',
      source: 'BACKGROUND',
    });
  });

  it('routes a command only to the matching filterCommand', () => {
    const sub = TestBed.inject(BackgroundSubService);
    const pub = TestBed.inject(BackgroundPubService);

    const onStatus: unknown[] = [];
    const onTracks: unknown[] = [];
    sub.getStatus().subscribe((c) => onStatus.push(c));
    sub.getTracksFound().subscribe((c) => onTracks.push(c));

    pub.publishStatus(status);

    expect(onStatus).toHaveLength(1);
    expect(onTracks).toHaveLength(0);
  });

  it('keeps delivering to a second subscriber added later', () => {
    const sub = TestBed.inject(BackgroundSubService);
    const pub = TestBed.inject(BackgroundPubService);

    const first: unknown[] = [];
    sub.getStatus().subscribe((c) => first.push(c));
    pub.publishStatus(status);

    // share() resets its source on refCount 0, and RxJS 7 changed when that
    // happens. A late subscriber must still receive subsequent commands.
    const second: unknown[] = [];
    sub.getStatus().subscribe((c) => second.push(c));
    pub.publishStatus(status);

    expect(first).toHaveLength(2);
    expect(second).toHaveLength(1);
  });
});
