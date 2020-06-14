import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { TracksModule } from '@plopdown/tracks';
import { IconModule } from '@plopdown/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserRefModule } from '@plopdown/browser-ref';
import {
  LoggerModule,
  LogConsoleService,
  LogStorageService,
} from '@plopdown/logger';
import { HomeComponent } from './home/home.component';
import { SubnavComponent } from './subnav/subnav.component';
import { RouteData } from './route-data.model';
import { VideosComponent } from './videos/videos.component';
import { TracksComponent } from './tracks/tracks.component';
import { SettingsComponent } from './settings/settings.component';
import { VideoRefsModule } from '@plopdown/video-refs';
import { VideoEditorComponent } from './videos/video-editor/video-editor.component';
import { TrackSelectorComponent } from './videos/track-selector/track-selector.component';
import { WindowRefModule } from '@plopdown/window-ref';
import { TrackEditorComponent } from './tracks/track-editor/track-editor.component';
import { FileManagerComponent } from './tracks/file-manager/file-manager/file-manager.component';
import { FileImporterComponent } from './tracks/file-importer/file-importer.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubnavComponent,
    VideosComponent,
    TracksComponent,
    SettingsComponent,
    VideoEditorComponent,
    TrackSelectorComponent,
    TrackEditorComponent,
    FileManagerComponent,
    FileImporterComponent,
    LogViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserRefModule,
    VideoRefsModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    TracksModule,
    WindowRefModule,
    PlopdownFileModule,
    LoggerModule.forRoot({
      appName: 'Options',
      color: 'orange',
      providers: [LogConsoleService, LogStorageService],
    }),
    RouterModule.forRoot(
      [
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'videos',
          component: VideosComponent,
        },
        {
          path: 'tracks',
          component: TracksComponent,
        },
        {
          path: 'settings',
          component: SettingsComponent,
        },
        {
          path: 'logs',
          component: LogViewerComponent,
        },
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
      {
        useHash: true,
        initialNavigation: true,
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
