import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackManagerComponent } from './track-manager.component';

describe('VideoManagerComponent', () => {
  let component: TrackManagerComponent;
  let fixture: ComponentFixture<TrackManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockBrowserRefModule,
        MockIconModule,
        MockWindowRefModule,
        MockTracksModule,
        MockLoggerModule,
      ],
      declarations: [TrackManagerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
