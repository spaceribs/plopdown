import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { LoggerModule } from '@plopdown/logger';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    LoggerModule.forRoot({ appName: 'Options', color: 'orange' }),
    RouterModule.forRoot([], { useHash: true, initialNavigation: 'enabled' })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
