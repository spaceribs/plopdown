import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { NgModule } from '@angular/core';
import {
  BackgroundSubService,
  BackgroundPubService,
  MessagesModule,
} from '@plopdown/messages';
import { MockBackgroundPubService } from './background-pub.service.mock';
import { MockBackgroundSubService } from './background-sub.service.mock';

@NgModule({
  imports: [MessagesModule, MockBrowserRefModule],
  providers: [
    { provide: BackgroundPubService, useClass: MockBackgroundPubService },
    { provide: BackgroundSubService, useClass: MockBackgroundSubService },
  ],
})
export class MockMessagesModule {}
