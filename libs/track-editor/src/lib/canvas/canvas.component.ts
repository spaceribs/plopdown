import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'plopdown-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  public startTime: Date = new Date(0);
  @Input() public endTime: Date = new Date(10000);

  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<number> = new EventEmitter();

  @Input() public time: Date = new Date(5000);
  @Output() public timeChange: EventEmitter<Date> = new EventEmitter();

  @ViewChild('scrollBox')
  public scrollBox: ElementRef<HTMLDivElement> | null = null;

  public get timePosition(): number {
    return this.time.getTime() / this.zoom;
  }

  public get scrollWidth(): number {
    return this.endTime.getTime() / this.zoom;
  }

  public setTime(event: MouseEvent) {
    const relativeLeft = event.offsetX;
    const scrollWidth = this.scrollBox?.nativeElement.scrollWidth;
    if (scrollWidth != null) {
      const ratio = relativeLeft / scrollWidth;
      const newTime = new Date(this.endTime.getTime() * ratio);
      this.timeChange.emit(newTime);
    }
  }
}
