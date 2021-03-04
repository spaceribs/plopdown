import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlopdownEmbedComponent } from './plopdown-embed.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { EmbedMenuComponent } from './embed-menu/embed-menu.component';
import { Track } from '@plopdown/tracks';
import { Cue, CueRendererComponent } from '@plopdown/plopdown-cues';
import { CueTimelineComponent } from './cue-timeline/cue-timeline.component';

const mockVideoElem = document.createElement('video');
mockVideoElem['addTextTrack'] = jest.fn().mockReturnValue({});
mockVideoElem['pause'] = jest.fn();

@Component({
  selector: 'plopdown-embed-menu',
  template: '',
})
export class MockEmbedMenuComponent implements Partial<EmbedMenuComponent> {
  @Input() tracks: Track[];
  @Input() track: Track | null;
}

@Component({
  selector: 'plopdown-cue-renderer',
  template: '',
})
export class MockCueRendererComponent implements Partial<CueRendererComponent> {
  @Input() cues: Cue[];
  @Input() videoElem: HTMLVideoElement;
}

@Component({
  selector: 'plopdown-cue-timeline',
  template: '',
})
export class MockCueTimelineComponent implements Partial<CueTimelineComponent> {
  @Input() videoElem: HTMLVideoElement;
  @Input() track: Track | null;
  @Input() activeCues: Cue[] | null;
}

describe('PlopdownEmbedComponent', () => {
  let component: PlopdownEmbedComponent;
  let fixture: ComponentFixture<PlopdownEmbedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule, MockLoggerModule, NoopAnimationsModule],
      declarations: [
        PlopdownEmbedComponent,
        MockEmbedMenuComponent,
        MockCueRendererComponent,
        MockCueTimelineComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlopdownEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
