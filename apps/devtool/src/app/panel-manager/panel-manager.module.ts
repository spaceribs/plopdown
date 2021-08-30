import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PanelManagerRoutingModule } from './panel-manager-routing.module';
import { PanelManagerComponent } from './panel-manager.component';

const routes: Routes = [
  { path: '', component: PanelManagerComponent }
];

@NgModule({
  declarations: [
    PanelManagerComponent
  ],
  imports: [
    CommonModule,
    PanelManagerRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class PanelManagerModule { }
