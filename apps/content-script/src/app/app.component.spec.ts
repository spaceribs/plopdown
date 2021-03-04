import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockVideoAttachmentsComponent } from '@plopdown/plopdown-injector/mock';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockLoggerModule,
        MockTracksModule,
        MockMessagesModule,
        MockPlopdownFileModule,
        MockWindowRefModule,
        MockVideoRefsModule,
      ],
      declarations: [AppComponent, MockVideoAttachmentsComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
