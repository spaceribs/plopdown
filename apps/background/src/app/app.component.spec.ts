import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { MockExtStorageModule } from '@plopdown/ext-storage/mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  template: ``,
  selector: 'plopdown-get-status',
  standalone: false,
})
class MockGetStatusComponent {}

@Component({
  template: ``,
  selector: 'plopdown-new-install',
  standalone: false,
})
class MockNewInstallComponent {}

@Component({
  template: ``,
  selector: 'plopdown-tracks-requested',
  standalone: false,
})
class MockTracksRequestedComponent {}

@Component({
  template: ``,
  selector: 'plopdown-video-refs-requested',
  standalone: false,
})
class MockVideoRefsRequestedComponent {}

@Component({
  template: ``,
  selector: 'plopdown-install-content-script',
  standalone: false,
})
class MockInstallContentScriptComponent {}

@Component({
  template: ``,
  selector: 'plopdown-sync-databases',
  standalone: false,
})
class MockSyncDatabasesComponent {}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MockLoggerModule,
        MockPlopdownFileModule,
        MockTracksModule,
        MockVideoRefsModule,
        MockBrowserRefModule,
        MockMessagesModule,
        MockExtStorageModule,
        MockPermissionsModule,
      ],
      declarations: [
        AppComponent,
        MockNewInstallComponent,
        MockGetStatusComponent,
        MockTracksRequestedComponent,
        MockInstallContentScriptComponent,
        MockVideoRefsRequestedComponent,
        MockSyncDatabasesComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
