import { NgModule } from '@angular/core';
import { PouchDBModule } from '../src/lib/pouchdb.module';
import { PouchDBService } from '../src/lib/pouchdb.service';
import { MockPouchDBService } from './pouchdb.service.mock';

@NgModule({
  imports: [PouchDBModule],
  providers: [{ provide: PouchDBService, useClass: MockPouchDBService }],
})
export class MockPouchDBModule {}
