import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'plopdown-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent {
  @Input() public title: string = '';
  @Output() public layerDrop: EventEmitter<void> = new EventEmitter();
}
