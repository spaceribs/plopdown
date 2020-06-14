import { PlopdownCuesModule } from '@plopdown/plopdown-embed';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoOverlayComponent } from './video-overlay/video-overlay.component';
import { VideoAttachmentComponent } from './video-attachment/video-attachment.component';
import { VideoAttachmentsComponent } from './video-attachments/video-attachments.component';
import { OverlayMenuComponent } from './overlay-menu/overlay-menu.component';
import { CueTimelineComponent } from './cue-timeline/cue-timeline.component';

@NgModule({
  declarations: [
    VideoOverlayComponent,
    VideoAttachmentComponent,
    VideoAttachmentsComponent,
    OverlayMenuComponent,
    CueTimelineComponent,
  ],
  exports: [VideoAttachmentsComponent, VideoOverlayComponent],
  imports: [CommonModule, IconModule, PlopdownCuesModule],
})
export class PlopdownOverlayModule {}
