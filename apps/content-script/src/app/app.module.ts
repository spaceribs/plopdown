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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    VideoRefsModule,
    WindowRefModule,
    BrowserRefModule,
    MessagesModule,
    LoggerModule.forRoot({
      appName: `ContentScript:"${document.title}"`,
      color: 'blue'
    })
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
