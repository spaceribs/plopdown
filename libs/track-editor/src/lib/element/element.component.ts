import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'plopdown-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  @Input() public totalTime: Date = new Date(0);
  @Input() public start: Date = new Date(0);
  @Input() public end: Date = new Date(0);

  @HostBinding('attr.tabindex') public tabIndex = 0;

  @Input()
  @HostBinding('style.background-color')
  public color: string = '#0F0';

  @HostBinding('style.left.%')
  public get left(): number {
    return (this.start.getTime() / this.totalTime.getTime()) * 100;
  }

  @HostBinding('style.right.%')
  public get right(): number {
    return 100 - (this.end.getTime() / this.totalTime.getTime()) * 100;
  }

  @HostListener('click', ['$event'])
  public onClick($event: MouseEvent) {
    $event.stopPropagation();
    return false;
  }
}
