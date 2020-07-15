import { SiteFooterModule } from '../site-footer/site-footer.module';
import { SiteNavModule } from '../site-nav/site-nav.module';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlopdownInjectorModule } from '@plopdown/plopdown-injector';
import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { ShareComponent } from './share.component';
import { WindowRefModule } from '@plopdown/window-ref';

const routes: Routes = [{ path: '', component: ShareComponent }];

@NgModule({
  declarations: [ShareComponent],
  imports: [
    CommonModule,
    PlopdownInjectorModule,
    PlopdownFileModule,
    SiteNavModule,
    SiteFooterModule,
    WindowRefModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class ShareModule {}
