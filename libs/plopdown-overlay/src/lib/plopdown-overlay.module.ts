import { PlopdownCuesModule } from '@plopdown/plopdown-cues';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoOverlayComponent } from './video-overlay/video-overlay.component';
import { VideoAttachmentComponent } from './video-attachment/video-attachment.component';
import { VideoAttachmentsComponent } from './video-attachments/video-attachments.component';
import { OverlayMenuComponent } from './overlay-menu/overlay-menu.component';

@NgModule({
  declarations: [
    VideoOverlayComponent,
    VideoAttachmentComponent,
    VideoAttachmentsComponent,
    OverlayMenuComponent
  ],
  exports: [VideoAttachmentsComponent, VideoOverlayComponent],
  imports: [CommonModule, IconModule, PlopdownCuesModule]
})
export class PlopdownOverlayModule {}
