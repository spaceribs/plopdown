import { HashVideoRefsService } from './hash-video-refs.service';
import { PlopdownEmbedModule } from '@plopdown/plopdown-embed';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoAttachmentComponent } from './video-attachment/video-attachment.component';
import { VideoAttachmentsComponent } from './video-attachments/video-attachments.component';

@NgModule({
  declarations: [VideoAttachmentComponent, VideoAttachmentsComponent],
  exports: [VideoAttachmentsComponent, VideoAttachmentComponent],
  imports: [CommonModule, IconModule, PlopdownEmbedModule],
  providers: [HashVideoRefsService],
})
export class PlopdownInjectorModule {}
