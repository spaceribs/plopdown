import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoggerModule, LogConsoleService } from '@plopdown/logger';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      appName: 'Website',
      color: 'magenta',
      providers: [LogConsoleService],
    }),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
        },
        {
          path: 'blog',
          loadChildren: () =>
            import('./blog/blog.module').then((m) => m.BlogModule),
        },
        { path: '**', redirectTo: '' },
      ],
      { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
