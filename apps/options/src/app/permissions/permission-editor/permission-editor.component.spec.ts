import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEditorComponent } from './permission-editor.component';

describe('VideoEditorComponent', () => {
  let component: PermissionEditorComponent;
  let fixture: ComponentFixture<PermissionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, FormsModule, ReactiveFormsModule],
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
