import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AudioComponent } from './audio.component';
import { TrackService } from '@plopdown/tracks';

const mockVideoElem = document.createElement('video');
mockVideoElem['addTextTrack'] = jest.fn().mockReturnValue({});
mockVideoElem['pause'] = jest.fn();

describe('AudioComponent', () => {
  let component: AudioComponent;
  let fixture: ComponentFixture<AudioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, MockLoggerModule, MockWindowRefModule],
      declarations: [AudioComponent],
      providers: [TrackService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioComponent);
    component = fixture.componentInstance;
    const videoElem = document.createElement('video');
    videoElem.pause = jest.fn();
    component.videoElem = videoElem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
