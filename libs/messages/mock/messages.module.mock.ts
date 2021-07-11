import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { NgModule } from '@angular/core';
import { MockBackgroundPubService } from './background-pub.service.mock';
import { MockBackgroundSubService } from './background-sub.service.mock';
import { MessagesModule } from '../src/lib/messages.module';
import {
  BackgroundPubService,
  BackgroundSubService,
} from '../src/lib/background';

@NgModule({
  imports: [MessagesModule, MockBrowserRefModule],
  providers: [
    { provide: BackgroundPubService, useClass: MockBackgroundPubService },
    { provide: BackgroundSubService, useClass: MockBackgroundSubService },
  ],
})
export class MockMessagesModule {}
