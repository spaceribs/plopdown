import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { MockExtStorageModule } from '@plopdown/ext-storage/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerComponent } from './scanner.component';
import { FormsModule } from '@angular/forms';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScannerComponent', () => {
  let component: ScannerComponent;
  let fixture: ComponentFixture<ScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MockIconModule,
        MockWindowRefModule,
        MockTracksModule,
        MockBrowserRefModule,
        MockVideoRefsModule,
        MockMessagesModule,
        MockLoggerModule,
        MockExtStorageModule,
        MockPermissionsModule,
        NoopAnimationsModule,
      ],
      declarations: [ScannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
