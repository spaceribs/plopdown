import { BrowserRefModule } from '@plopdown/browser-ref';
import { TracksModule } from '@plopdown/tracks';
import { LoggerModule } from '@plopdown/logger';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesModule } from '@plopdown/messages';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    HttpClientModule,
    LoggerModule.forRoot({ appName: 'Background', color: 'red' }),
    MessagesModule,
    TracksModule
  ]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    const plopdownAppElem = document.createElement('plopdown-background');
    document.body.appendChild(plopdownAppElem);
    appRef.bootstrap(AppComponent);
  }
}
