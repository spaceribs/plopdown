import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemotesService } from './remotes.service';
import { RemoteValidatorService } from './remote-validator.service';

@NgModule({
  imports: [CommonModule],
  providers: [RemotesService, RemoteValidatorService],
})
export class RemotesModule {}
