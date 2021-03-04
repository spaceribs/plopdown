import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DevtoolsRefModule } from '@plopdown/devtools-ref';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DevtoolsRefModule,
    RouterModule.forRoot([], {
    useHash: true,
    initialNavigation: 'enabledNonBlocking',
    relativeLinkResolution: 'legacy'
}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
