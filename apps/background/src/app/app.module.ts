import { ExtStorageModule } from '@plopdown/ext-storage';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { TracksModule } from '@plopdown/tracks';
import { LoggerModule } from '@plopdown/logger';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesModule } from '@plopdown/messages';
import { VideoRefsModule } from '@plopdown/video-refs';
import { PlopdownFileModule } from '@plopdown/plopdown-file';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    HttpClientModule,
    PlopdownFileModule,
    ExtStorageModule,
    LoggerModule.forRoot({ appName: 'Background', color: 'red' }),
    MessagesModule,
    VideoRefsModule,
    TracksModule
  ]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const plopdownAppElem = document.createElement('plopdown-background');
    document.body.appendChild(plopdownAppElem);
    appRef.bootstrap(AppComponent);
  }
}
