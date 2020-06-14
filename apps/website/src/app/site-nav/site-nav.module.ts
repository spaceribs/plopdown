import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SiteNavComponent } from './site-nav.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SiteNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [SiteNavComponent],
})
export class SiteNavModule {}
