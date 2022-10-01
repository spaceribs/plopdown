import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelManagerComponent } from './panel-manager.component';

const routes: Routes = [{ path: '', component: PanelManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelManagerRoutingModule {}
