import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioEditsComponent } from './audio-edits.component';

describe('AudioEditsComponent', () => {
  let component: AudioEditsComponent;
  let fixture: ComponentFixture<AudioEditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioEditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioEditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
