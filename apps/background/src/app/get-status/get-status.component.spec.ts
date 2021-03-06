import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetStatusComponent } from './get-status.component';

describe('GetStatusComponent', () => {
  let component: GetStatusComponent;
  let fixture: ComponentFixture<GetStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
      declarations: [GetStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
