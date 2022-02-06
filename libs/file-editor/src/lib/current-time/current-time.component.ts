import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'plopdown-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTimeComponent {
  @HostBinding('style.left.px')
  @Input()
  public left: number = 0;

  @Input() public time: number = 0;
}
