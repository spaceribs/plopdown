import { PermissionEditorComponent } from './permission-editor/permission-editor.component';
import { PermissionsComponent } from './permissions.component';
import { IconModule } from '@plopdown/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PermissionsComponent, PermissionEditorComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: PermissionsComponent,
      },
    ]),
  ],
})
export class PermissionsViewModule {}
