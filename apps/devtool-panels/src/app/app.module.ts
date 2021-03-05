import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {
    useHash: true,
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
