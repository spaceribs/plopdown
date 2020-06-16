import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentScannerComponent } from './content-scanner.component';
import { WindowRefModule } from '@plopdown/window-ref';

describe('ContentScannerComponent', () => {
  let component: ContentScannerComponent;
  let fixture: ComponentFixture<ContentScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        WindowRefModule,
        MockLoggerModule,
        MockBrowserRefModule,
        MockMessagesModule,
      ],
      declarations: [ContentScannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
