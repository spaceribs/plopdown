import { NgModule } from '@angular/core';
import { TracksModule } from '../src/lib/tracks.module';
import { TracksService } from '../src/lib/tracks.service';
import { MockTracksService } from './tracks.service.mock';

@NgModule({
  imports: [TracksModule],
  providers: [{ provide: TracksService, useClass: MockTracksService }],
})
export class MockTracksModule {}
