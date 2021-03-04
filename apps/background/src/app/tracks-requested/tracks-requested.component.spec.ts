import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TracksRequestedComponent } from './tracks-requested.component';

describe('TracksRequestedComponent', () => {
  let component: TracksRequestedComponent;
  let fixture: ComponentFixture<TracksRequestedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockTracksModule, MockMessagesModule, MockLoggerModule],
      declarations: [TracksRequestedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
