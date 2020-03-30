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
import { RouterModule, Routes } from '@angular/router';
import { VideoManagerComponent } from './video-manager/video-manager.component';
import { ScannerComponent } from './scanner/scanner.component';

const appRoutes: Routes = [
  { path: '', component: ScannerComponent },
  { path: 'videos', component: VideoManagerComponent }
];

@NgModule({
  declarations: [AppComponent, VideoManagerComponent, ScannerComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    LoggerModule.forRoot({ appName: 'BrowserAction', color: 'green' }),
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      initialNavigation: 'enabled'
    }),
    BrowserAnimationsModule,
    MessagesModule,
    WindowRefModule,
    VideoRefsModule,
    TracksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
