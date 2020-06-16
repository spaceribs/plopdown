import { NgModule } from '@angular/core';
import { TracksModule, TracksService } from '@plopdown/tracks';
import { MockTracksService } from './tracks.service.mock';

@NgModule({
  imports: [TracksModule],
  providers: [{ provide: TracksService, useClass: MockTracksService }],
})
export class MockTracksModule {}
