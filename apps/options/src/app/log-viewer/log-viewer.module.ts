import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogViewerComponent } from './log-viewer.component';
import { IconModule } from '@plopdown/icon';

@NgModule({
  declarations: [LogViewerComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogViewerComponent,
      },
    ]),
  ],
})
export class LogViewerModule {}
