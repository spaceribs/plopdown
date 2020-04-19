import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CueEditorComponent } from './cue-editor.component';

describe('CueEditorComponent', () => {
  let component: CueEditorComponent;
  let fixture: ComponentFixture<CueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
