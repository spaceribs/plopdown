import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockIconModule } from '@plopdown/icon/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoEditorComponent } from './video-editor.component';

describe('VideoEditorComponent', () => {
  let component: VideoEditorComponent;
  let fixture: ComponentFixture<VideoEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, FormsModule, ReactiveFormsModule],
      declarations: [VideoEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
