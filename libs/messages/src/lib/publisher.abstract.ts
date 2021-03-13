import { TabsService } from '@plopdown/browser-ref';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, forkJoin } from 'rxjs';
import { MessagesService } from './messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from './messages.model';
import { map, tap, mapTo, mergeMap } from 'rxjs/operators';

// TODO: Add Angular decorator.
@Injectable()
export abstract class PortPublisher<C extends Record<string, unknown>>
  implements OnDestroy {
  protected command$: Subject<C> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(
    source: Source,
    messages: MessagesService,
    logger: LoggerService,
    tabs?: TabsService
  ) {
    const commandsSub = this.command$
      .pipe(
        tap((command) => logger.debug('Command to be Published', command)),
        map((command) => {
          return { source, ...command };
        }),
        mergeMap((message) => {
          if (tabs) {
            return forkJoin([
              messages.sendMessage(message),
              tabs.sendMessage(message),
            ]).pipe(mapTo(message));
          }

          return messages.sendMessage(message).pipe(mapTo(message));
        })
      )
      .subscribe({
        next: (cmd) => {
          logger.debug('Command Published', cmd);
        },
        error: (err) => {
          logger.error('Command Pipeline Broken', err);
        },
      });
    this.subs.add(commandsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
