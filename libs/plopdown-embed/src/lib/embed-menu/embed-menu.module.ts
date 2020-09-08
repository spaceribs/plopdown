import { FormsModule } from '@angular/forms';
import { TracksModalComponent } from './tracks-modal/tracks-modal.component';
import { CommonModule } from '@angular/common';
import { PlopdownLogoComponent } from './plopdown-logo/plopdown-logo.component';
import { EmbedMenuComponent } from './embed-menu.component';
import { NgModule } from '@angular/core';
import { IconModule } from '@plopdown/icon';

@NgModule({
  imports: [CommonModule, IconModule, FormsModule],
  declarations: [
    EmbedMenuComponent,
    PlopdownLogoComponent,
    TracksModalComponent,
  ],
  exports: [EmbedMenuComponent],
  providers: [],
})
export class InjectorMenuModule {}
