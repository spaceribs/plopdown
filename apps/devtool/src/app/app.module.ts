import { MessagesModule } from '@plopdown/messages';
import {
  LogConsoleService,
  LoggerModule,
  LogStorageService,
} from '@plopdown/logger';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DevtoolsRefModule } from '@plopdown/devtools-ref';

const routes: Routes = [
  {
    path: 'panel-manager',
    loadChildren: () =>
      import('./panel-manager/panel-manager.module').then(
        (m) => m.PanelManagerModule
      ),
  },
  {
    path: 'files-editor',
    loadChildren: () =>
      import('./files-editor/files-editor.module').then(
        (m) => m.FilesEditorModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DevtoolsRefModule,
    MessagesModule,
    LoggerModule.forRoot({
      appName: 'Devtool',
      color: 'green',
      providers: [LogConsoleService, LogStorageService],
    }),
    RouterModule.forRoot(routes, {
      useHash: true,
      initialNavigation: 'enabledNonBlocking',
      relativeLinkResolution: 'legacy',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
