import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserRefModule } from '@plopdown/browser-ref';
import { LoggerModule } from '@plopdown/logger';
import { HomeComponent } from './home/home.component';
import { SubnavComponent } from './subnav/subnav.component';
import { RouteData } from './route-data.model';

@NgModule({
  declarations: [AppComponent, HomeComponent, SubnavComponent],
  imports: [
    BrowserModule,
    BrowserRefModule,
    LoggerModule.forRoot({ appName: 'Options', color: 'orange' }),
    RouterModule.forRoot(
      [
        {
          path: 'home',
          component: HomeComponent,
          data: {
            title: 'Home',
            subtitle: 'Introduction and Getting Started'
          } as RouteData
        },
        {
          path: '**',
          redirectTo: 'home'
        }
      ],
      {
        useHash: true,
        initialNavigation: true
      }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
