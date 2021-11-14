import { Component, Input } from '@angular/core';

@Component({
  selector: 'plopdown-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent {
  @Input() public title: string = '';
}
