import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'plopdown-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent {
  @Output() public layerDrop: EventEmitter<void> = new EventEmitter();
}
