import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecodeEditorComponent } from './timecode-editor.component';

describe('ActionsComponent', () => {
  let component: TimecodeEditorComponent;
  let fixture: ComponentFixture<TimecodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimecodeEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimecodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
