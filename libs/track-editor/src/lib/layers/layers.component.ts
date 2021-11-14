import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'plopdown-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent {
  @HostBinding('style.width.px')
  @Input()
  public width: number = 0;
}
