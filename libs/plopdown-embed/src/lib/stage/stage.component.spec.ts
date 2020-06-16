import { MockLoggerModule } from '@plopdown/logger/mock';
import { SavedTrack } from '@plopdown/tracks';
import { CueTimelineComponent } from './../widgets/cue-timeline/cue-timeline.component';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { CueRendererComponent } from './../cue-renderer/cue-renderer.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageComponent } from './stage.component';
import { OverlayMenuComponent } from '../widgets/overlay-menu/overlay-menu.component';
import { Component, Input } from '@angular/core';
import { Cue } from '../models/plopdown-cue.model';
import { VIDEO_ELEM_TOKEN, TRACK_TOKEN } from '@plopdown/tokens';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'plopdown-injector-menu',
  template: '',
})
class MockOverlayMenuComponent implements Partial<OverlayMenuComponent> {}

@Component({
  selector: 'plopdown-cue-renderer',
  template: '',
})
class MockCueRendererComponent implements Partial<CueRendererComponent> {
  @Input() cues: Cue[];
}

@Component({
  selector: 'plopdown-cue-timeline',
  template: '',
})
class MockCueTimelineComponent implements Partial<CueTimelineComponent> {
  @Input() videoElem: HTMLVideoElement;
  @Input() activeCues: Cue[];
  @Input() track: SavedTrack;
}

const mockVideoElem = document.createElement('video');
mockVideoElem['addTextTrack'] = jest.fn().mockReturnValue({});
mockVideoElem['pause'] = jest.fn();

describe('StageComponent', () => {
  let component: StageComponent;
  let fixture: ComponentFixture<StageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule, MockLoggerModule, NoopAnimationsModule],
      declarations: [
        StageComponent,
        MockOverlayMenuComponent,
        MockCueRendererComponent,
        MockCueTimelineComponent,
      ],
      providers: [
        {
          provide: VIDEO_ELEM_TOKEN,
          useValue: mockVideoElem,
        },
        {
          provide: TRACK_TOKEN,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
