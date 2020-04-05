import { IconModule } from '@plopdown/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtStorageModule } from '@plopdown/ext-storage';
import { WindowRefModule } from '@plopdown/window-ref';
import { VideoRefsModule } from '@plopdown/video-refs';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  DoBootstrap,
  ApplicationRef,
  OnDestroy
} from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerModule } from '@plopdown/logger';
import { MessagesModule } from '@plopdown/messages';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { VideoAttachmentComponent } from './video-attachment/video-attachment.component';
import { VideoAttachmentsComponent } from './video-attachments/video-attachments.component';
import { ContentScannerComponent } from './content-scanner/content-scanner.component';
import { VideoOverlayComponent } from './video-overlay/video-overlay.component';
import { OverlayMenuComponent } from './overlay-menu/overlay-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoAttachmentComponent,
    VideoAttachmentsComponent,
    ContentScannerComponent,
    VideoOverlayComponent,
    OverlayMenuComponent
  ],
  imports: [
    BrowserModule,
    ExtStorageModule,
    VideoRefsModule,
    WindowRefModule,
    BrowserRefModule,
    MessagesModule,
    LoggerModule.forRoot({
      appName: `ContentScript:"${document.title}"`,
      color: 'blue'
    }),
    BrowserAnimationsModule,
    IconModule
  ]
})
export class AppModule implements DoBootstrap, OnDestroy {
  private appElement: HTMLElement;

  ngOnDestroy(): void {
    this.appElement.remove();
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    this.appElement = document.createElement('plopdown-cs');
    document.body.appendChild(this.appElement);
    appRef.bootstrap(AppComponent);
  }
}
