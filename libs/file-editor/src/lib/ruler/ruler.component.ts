import { Tick } from './ruler.models';
import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'plopdown-ruler',
  templateUrl: './ruler.component.html',
  styleUrls: ['./ruler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulerComponent {
  @HostBinding('style.width.px')
  @Input()
  public width: number = 0;

  @Input() public viewStart: number = 0;
  @Input() public viewEnd: number = 0;

  @Input() public zoom: number = 0;

  public get numOfTicks(): number {
    return Math.ceil(this.width / this.zoom);
  }

  public get ticks(): Tick[] {
    return new Array(this.numOfTicks).fill(0).map((_, index) => {
      return {
        time: new Date(index * 100 * this.zoom),
        left: index * 100,
      };
    });
  }

  public trackTicks(_: number, tick: Tick) {
    return tick.left;
  }
}
