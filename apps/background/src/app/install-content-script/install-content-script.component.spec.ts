import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstallContentScriptComponent } from './install-content-script.component';

describe('InstallContentScriptComponent', () => {
  let component: InstallContentScriptComponent;
  let fixture: ComponentFixture<InstallContentScriptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, MockBrowserRefModule, MockMessagesModule],
      declarations: [InstallContentScriptComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallContentScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
