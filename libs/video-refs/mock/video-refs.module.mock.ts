import { NgModule } from '@angular/core';
import { VideoRefsModule } from '../src/lib/video-refs.module';
import { VideoRefsService } from '../src/lib/video-refs.service';
import { MockVideoRefsService } from './video-refs.service.mock';

@NgModule({
  imports: [VideoRefsModule],
  providers: [{ provide: VideoRefsService, useClass: MockVideoRefsService }],
})
export class MockVideoRefsModule {}
