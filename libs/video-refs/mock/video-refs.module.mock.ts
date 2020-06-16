import { VideoRefsModule, VideoRefsService } from '@plopdown/video-refs';
import { NgModule } from '@angular/core';
import { MockVideoRefsService } from './video-refs.service.mock';

@NgModule({
  imports: [VideoRefsModule],
  providers: [{ provide: VideoRefsService, useClass: MockVideoRefsService }],
})
export class MockVideoRefsModule {}
