import { IconModule } from '@plopdown/icon';
import { WindowRefModule } from '@plopdown/window-ref';
import { VideoRefsModule } from '@plopdown/video-refs';
import {
  LoggerModule,
  LogConsoleService,
  LogStorageService
} from '@plopdown/logger';
import { TracksModule } from '@plopdown/tracks';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { MessagesModule } from '@plopdown/messages';
import { ExtStorageModule } from '@plopdown/ext-storage';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoManagerComponent } from './video-manager/video-manager.component';
import { ScannerComponent } from './scanner/scanner.component';
import { TrackManagerComponent } from './track-manager/track-manager.component';

const appRoutes: Routes = [
  { path: '', component: ScannerComponent },
  { path: 'videos', component: VideoManagerComponent },
  { path: 'tracks', component: TrackManagerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VideoManagerComponent,
    TrackManagerComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserRefModule,
    ExtStorageModule,
    FormsModule,
    IconModule,
    LoggerModule.forRoot({
      appName: 'BrowserAction',
      color: 'green',
      providers: [LogConsoleService, LogStorageService]
    }),
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
