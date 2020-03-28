import { WindowRefModule } from '@plopdown/window-ref';
import { VideoRefsModule } from '@plopdown/video-refs';
import { LoggerModule } from '@plopdown/logger';
import { TracksModule } from '@plopdown/tracks';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { MessagesModule } from '@plopdown/messages';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    LoggerModule.forRoot({ appName: 'BrowserAction', color: 'green' }),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    MessagesModule,
    WindowRefModule,
    VideoRefsModule,
    TracksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
