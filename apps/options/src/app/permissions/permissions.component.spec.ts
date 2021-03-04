import { MockIconModule } from '@plopdown/icon/mock';
import { LzStringModule } from '@plopdown/lz-string';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionsComponent } from './permissions.component';
import { PermissionEditorComponent } from './permission-editor/permission-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PermissionsComponent', () => {
  let component: PermissionsComponent;
  let fixture: ComponentFixture<PermissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockPermissionsModule,
        MockIconModule,
        MockBrowserRefModule,
        MockLoggerModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        LzStringModule,
      ],
      declarations: [PermissionsComponent, PermissionEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
