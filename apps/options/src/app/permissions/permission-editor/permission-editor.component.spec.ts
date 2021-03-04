import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockIconModule } from '@plopdown/icon/mock';
import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionEditorComponent } from './permission-editor.component';

describe('VideoEditorComponent', () => {
  let component: PermissionEditorComponent;
  let fixture: ComponentFixture<PermissionEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        FormsModule,
        ReactiveFormsModule,
        MockPermissionsModule,
        MockBrowserRefModule,
        MockVideoRefsModule,
      ],
      declarations: [PermissionEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
