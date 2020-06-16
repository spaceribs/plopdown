import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MockLoggerModule,
        MockPlopdownFileModule,
        MockTracksModule,
        MockVideoRefsModule,
        MockBrowserRefModule,
        MockMessagesModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
