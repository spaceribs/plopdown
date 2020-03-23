import { TabsService } from './../../../../libs/browser/src/lib/tabs.service';
import { TracksService } from '@plopdown/tracks';
import { LoggerModule } from '@plopdown/logger';
import { VideoRefsService } from '@plopdown/video-refs';
import {
  BrowserService,
  RuntimeService,
  StorageService
} from '@plopdown/browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerModule.forRoot({ appName: 'Background' })
  ],
  providers: [
    BrowserService,
    StorageService,
    RuntimeService,
    TabsService,
    VideoRefsService,
    TracksService
  ]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const plopdownAppElem = document.createElement('plopdown-background');
    document.body.appendChild(plopdownAppElem);
    appRef.bootstrap(AppComponent);
  }
}
