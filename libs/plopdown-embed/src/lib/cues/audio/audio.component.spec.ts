import {
  VIDEO_ELEM_TOKEN,
  TRACK_TOKEN,
  TRACK_FILES_TOKEN,
} from '@plopdown/tokens';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioComponent } from './audio.component';
import { SavedTrack } from '@plopdown/tracks';

const mockTrack: SavedTrack = {
  _id: '1',
  _rev: 'ABC',
  title: 'Mock Track',
  for: 'test',
  created: '01-01-1010',
  cues: [],
};

const mockVideoElem = document.createElement('video');
mockVideoElem['addTextTrack'] = jest.fn().mockReturnValue({});
mockVideoElem['pause'] = jest.fn();

describe('AudioComponent', () => {
  let component: AudioComponent;
  let fixture: ComponentFixture<AudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, MockLoggerModule],
      declarations: [AudioComponent],
      providers: [
        {
          provide: VIDEO_ELEM_TOKEN,
          useValue: mockVideoElem,
        },
        {
          provide: TRACK_TOKEN,
          useValue: mockTrack,
        },
        {
          provide: TRACK_FILES_TOKEN,
          useValue: new Map(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
