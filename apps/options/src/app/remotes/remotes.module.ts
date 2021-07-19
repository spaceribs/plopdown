import { RemotesModule } from '@plopdown/remotes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RemotesComponent } from './remotes.component';
import { RemoteEditorComponent } from './remote-editor/remote-editor.component';

@NgModule({
  declarations: [RemotesComponent, RemoteEditorComponent],
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    RemotesModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemotesComponent,
      },
    ]),
  ],
})
export class RemotesViewModule {}
