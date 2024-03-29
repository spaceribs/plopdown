import { PermissionsModule } from '@plopdown/permissions';
import { IconModule } from '@plopdown/icon';
import { WindowRefModule } from '@plopdown/window-ref';
import { VideoRefsModule } from '@plopdown/video-refs';
import {
  LoggerModule,
  LogConsoleService,
  LogStorageService,
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
import { PermissionsManagerComponent } from './permissions-manager/permissions-manager.component';
import { PouchDBModule } from '@plopdown/pouchdb';

const appRoutes: Routes = [
  { path: '', component: ScannerComponent },
  { path: 'videos', component: VideoManagerComponent },
  { path: 'tracks', component: TrackManagerComponent },
  { path: 'permissions', component: PermissionsManagerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    VideoManagerComponent,
    TrackManagerComponent,
    PermissionsManagerComponent,
    ScannerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserRefModule,
    ExtStorageModule,
    FormsModule,
    IconModule,
    PouchDBModule,
    LoggerModule.forRoot({
      appName: 'BrowserAction',
      color: 'green',
      providers: [LogConsoleService, LogStorageService],
    }),
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      initialNavigation: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
    BrowserAnimationsModule,
    MessagesModule,
    WindowRefModule,
    VideoRefsModule,
    PermissionsModule,
    TracksModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
