import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'plopdown-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss'],
})
export class CurrentTimeComponent {
  @HostBinding('style.left.px')
  @Input()
  public left: number = 0;

  @Input() public time: Date = new Date(0);
}
