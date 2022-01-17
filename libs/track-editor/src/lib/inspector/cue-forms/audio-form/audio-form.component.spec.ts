import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFormComponent } from './audio-form.component';

describe('AudioFormComponent', () => {
  let component: AudioFormComponent;
  let fixture: ComponentFixture<AudioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
