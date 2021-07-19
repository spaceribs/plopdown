import { TrackSelectorComponent } from './track-selector/track-selector.component';
import { VideoEditorComponent } from './video-editor/video-editor.component';
import { VideosComponent } from './videos.component';
import { IconModule } from '@plopdown/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VideosComponent, VideoEditorComponent, TrackSelectorComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideosComponent,
      },
    ]),
  ],
})
export class VideosViewModule {}
