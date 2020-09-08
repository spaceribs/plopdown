import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioComponent } from './audio.component';

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
