import { SiteFooterModule } from './../site-footer/site-footer.module';
import { SiteNavModule } from './../site-nav/site-nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {
  PlopdownInjectorModule,
  LoadAssetService,
} from '@plopdown/plopdown-injector';
import { HttpClientModule } from '@angular/common/http';
import { PlopdownFileModule } from '@plopdown/plopdown-file';
import { WebLoadAssetService } from './web-load-asset.service';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PlopdownInjectorModule,
    PlopdownFileModule,
    SiteNavModule,
    SiteFooterModule,
    RouterModule.forChild(routes),
  ],
  providers: [{ provide: LoadAssetService, useClass: WebLoadAssetService }],
})
export class HomeModule {}
