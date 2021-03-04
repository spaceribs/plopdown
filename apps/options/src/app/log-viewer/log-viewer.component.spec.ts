import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogViewerComponent } from './log-viewer.component';

describe('LogViewerComponent', () => {
  let component: LogViewerComponent;
  let fixture: ComponentFixture<LogViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, MockLoggerModule],
      declarations: [LogViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
