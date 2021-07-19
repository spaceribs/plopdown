import { LzStringModule } from '@plopdown/lz-string';
import { HttpClientModule } from '@angular/common/http';
import { PermissionsModule } from '@plopdown/permissions';
import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { TracksModule } from '@plopdown/tracks';
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
import { VideoRefsModule } from '@plopdown/video-refs';
import { WindowRefModule } from '@plopdown/window-ref';
import { PouchDBModule } from '@plopdown/pouchdb';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserRefModule,
    VideoRefsModule,
    TracksModule,
    WindowRefModule,
    PlopdownFileModule,
    PermissionsModule,
    HttpClientModule,
    LzStringModule,
    PouchDBModule,
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
          loadChildren: () =>
            import('./videos/videos.module').then((m) => m.VideosViewModule),
        },
        {
          path: 'tracks',
          loadChildren: () =>
            import('./tracks/tracks.module').then((m) => m.TracksViewModule),
        },
        {
          path: 'settings',
          loadChildren: () =>
            import('./settings/settings.module').then(
              (m) => m.SettingsViewModule
            ),
        },
        {
          path: 'logs',
          loadChildren: () =>
            import('./log-viewer/log-viewer.module').then(
              (m) => m.LogViewerModule
            ),
        },
        {
          path: 'permissions',
          loadChildren: () =>
            import('./permissions/permissions.module').then(
              (m) => m.PermissionsViewModule
            ),
        },
        {
          path: 'remotes',
          loadChildren: () =>
            import('./remotes/remotes.module').then((m) => m.RemotesViewModule),
        },
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
      {
        useHash: true,
        initialNavigation: 'enabledNonBlocking',
        relativeLinkResolution: 'legacy',
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
