import { PlopdownCuesModule } from '@plopdown/plopdown-embed';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoAttachmentComponent } from './video-attachment/video-attachment.component';
import { VideoAttachmentsComponent } from './video-attachments/video-attachments.component';

@NgModule({
  declarations: [VideoAttachmentComponent, VideoAttachmentsComponent],
  exports: [VideoAttachmentsComponent],
  imports: [CommonModule, IconModule, PlopdownCuesModule],
})
export class PlopdownInjectorModule {}
