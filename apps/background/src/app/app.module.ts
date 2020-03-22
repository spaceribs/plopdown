import { VideoRefsService } from '@plopdown/video-refs';
import { BrowserService, RuntimeService } from '@plopdown/browser';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [BrowserService, VideoRefsService, RuntimeService]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('App Bootstrapped');
  }
}
