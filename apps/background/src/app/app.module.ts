import { VideoRefsRequestedComponent } from './video-refs-requested/video-refs-requested.component';
import { TracksRequestedComponent } from './tracks-requested/tracks-requested.component';
import { PermissionsModule } from '@plopdown/permissions';
import { LogStorageService } from '@plopdown/logger';
import { ExtStorageModule } from '@plopdown/ext-storage';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { TracksModule } from '@plopdown/tracks';
import { LoggerModule, LogConsoleService } from '@plopdown/logger';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesModule } from '@plopdown/messages';
import { VideoRefsModule } from '@plopdown/video-refs';
import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { NewInstallComponent } from './new-install/new-install.component';
import { InstallContentScriptComponent } from './install-content-script/install-content-script.component';
import { GetStatusComponent } from './get-status/get-status.component';
import { PouchDBModule } from '@plopdown/pouchdb';
import { RemotesModule } from '@plopdown/remotes';
import { SyncDatabasesComponent } from './sync-databases/sync-databases.component';

@NgModule({
  declarations: [
    AppComponent,
    NewInstallComponent,
    InstallContentScriptComponent,
    TracksRequestedComponent,
    VideoRefsRequestedComponent,
    GetStatusComponent,
    SyncDatabasesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserRefModule,
    HttpClientModule,
    PlopdownFileModule,
    ExtStorageModule,
    PouchDBModule,
    RemotesModule,
    LoggerModule.forRoot({
      appName: 'Background',
      color: 'red',
      providers: [LogConsoleService, LogStorageService],
    }),
    PermissionsModule,
    MessagesModule,
    VideoRefsModule,
    TracksModule,
  ],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const plopdownAppElem = document.createElement('plopdown-background');
    document.body.appendChild(plopdownAppElem);
    appRef.bootstrap(AppComponent);
  }
}
