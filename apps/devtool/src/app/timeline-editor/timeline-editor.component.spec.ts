import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEditorComponent } from './timeline-editor.component';

describe('TimelineEditorComponent', () => {
  let component: TimelineEditorComponent;
  let fixture: ComponentFixture<TimelineEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
