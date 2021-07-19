import { MockRemoteValidatorService } from './remote-validator.service.mock';
import { NgModule } from '@angular/core';
import { RemotesModule } from '../src/lib/remotes.module';
import { RemotesService } from '../src/lib/remotes.service';
import { MockRemotesService } from './remotes.service.mock';
import { RemoteValidatorService } from '../src/lib/remote-validator.service';

@NgModule({
  imports: [RemotesModule],
  providers: [
    { provide: RemotesService, useClass: MockRemotesService },
    { provide: RemoteValidatorService, useClass: MockRemoteValidatorService },
  ],
})
export class MockRemotesModule {}
