import { LzStringModule } from '@plopdown/lz-string';
import { TracksModule, TracksService } from '@plopdown/tracks';
import { IconModule } from '@plopdown/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtStorageModule } from '@plopdown/ext-storage';
import { WindowRefModule } from '@plopdown/window-ref';
import { VideoRefsModule, VideoRefsService } from '@plopdown/video-refs';
import { BrowserModule } from '@angular/platform-browser';
import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import {
  LoggerModule,
  LogConsoleService,
  LogStorageService,
} from '@plopdown/logger';
import { MessagesModule } from '@plopdown/messages';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { PlopdownInjectorModule } from '@plopdown/plopdown-injector';
import { HttpClientModule } from '@angular/common/http';
import { ContentScriptTracksService } from './content-script-tracks.service';
import { ContentScriptVideoRefsService } from './content-script-video-refs.service';

// TODO: Add Angular decorator.
@NgModule({
  declarations: [AppComponent],
  imports: [
    PlopdownFileModule,
    BrowserModule,
    ExtStorageModule,
    VideoRefsModule,
    TracksModule,
    WindowRefModule,
    BrowserRefModule,
    MessagesModule,
    PlopdownInjectorModule,
    HttpClientModule,
    LoggerModule.forRoot({
      appName: `ContentScript:"${document.title}"`,
      color: 'blue',
      providers: [LogConsoleService, LogStorageService],
    }),
    LzStringModule,
    BrowserAnimationsModule,
    IconModule,
  ],
  providers: [
    {
      provide: TracksService,
      useClass: ContentScriptTracksService,
    },
    {
      provide: VideoRefsService,
      useClass: ContentScriptVideoRefsService,
    },
  ],
})
export class AppModule implements DoBootstrap {
  private appElement: HTMLElement = document.createElement('plopdown-cs');

  ngDoBootstrap(appRef: ApplicationRef): void {
    document.body.appendChild(this.appElement);
    appRef.bootstrap(AppComponent);
  }
}
