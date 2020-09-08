import { MockLoggerModule } from '@plopdown/logger/mock';
import { Track } from '@plopdown/tracks';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlopdownEmbedComponent } from './plopdown-embed.component';
import { EmbedMenuComponent } from './embed-menu/embed-menu.component';
import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CueTimelineComponent } from './cue-timeline/cue-timeline.component';

@Component({
  selector: 'plopdown-injector-menu',
  template: '',
})
class MockEmbedMenuComponent implements Partial<EmbedMenuComponent> {}

@Component({
  selector: 'plopdown-cue-timeline',
  template: '',
})
class MockCueTimelineComponent implements Partial<CueTimelineComponent> {
  @Input() videoElem: HTMLVideoElement;
  @Input() track: Track;
}

const mockVideoElem = document.createElement('video');
mockVideoElem['addTextTrack'] = jest.fn().mockReturnValue({});
mockVideoElem['pause'] = jest.fn();

describe('PlopdownEmbedComponent', () => {
  let component: PlopdownEmbedComponent;
  let fixture: ComponentFixture<PlopdownEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule, MockLoggerModule, NoopAnimationsModule],
      declarations: [
        PlopdownEmbedComponent,
        MockEmbedMenuComponent,
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
