import { BrowserStorageService } from '@plopdown/browser-storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [BrowserStorageService]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('App Bootstrapped');
  }
}
