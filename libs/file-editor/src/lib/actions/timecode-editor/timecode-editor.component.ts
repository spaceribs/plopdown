import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'plopdown-timecode-editor',
  templateUrl: './timecode-editor.component.html',
  styleUrls: ['./timecode-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimecodeEditorComponent {
  @Input() time: number = 0;
  @Output() timeChange: EventEmitter<number> = new EventEmitter();

  get millseconds(): string {
    const milliseconds = this.time % 1_000;
    return this.formatInteger(milliseconds, 3);
  }
  set milliseconds(input: string) {
    const milliseconds = parseInt(input) % 1_001;
    const seconds = Math.floor((this.time % 60_000) / 1_000) * 1_000;
    this.time = seconds + milliseconds;
    this.timeChange.emit(seconds + milliseconds);
  }

  get seconds(): string {
    const seconds = (this.time % 60_000) / 1_000;
    return this.formatInteger(Math.floor(seconds), 2);
  }

  get minutes(): string {
    const seconds = (this.time % 60_000) / 1_000;
    const minutes = seconds / 60;
    return this.formatInteger(Math.floor(minutes), 2);
  }

  get hours(): string {
    const seconds = (this.time % 60_000) / 1_000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    return this.formatInteger(Math.floor(hours), 2);
  }

  private formatInteger(num: number, leadingZeros: number): string {
    const result = num.toString();
    return result.padStart(leadingZeros, '0');
  }
}
