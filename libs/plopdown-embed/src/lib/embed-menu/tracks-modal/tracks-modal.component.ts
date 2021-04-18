import { LoggerService } from '@plopdown/logger';
import {
  Component,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { Track } from '@plopdown/tracks';
import { Subscription } from 'rxjs';

@Component({
  selector: 'plopdown-track-selector',
  templateUrl: './tracks-modal.component.html',
  styleUrls: ['./tracks-modal.component.scss'],
})
export class TracksModalComponent implements OnDestroy {
  private subs = new Subscription();

  public save = false;
  @Input() public track: Track | null = null;

  @Input() public tracks: Track[] = [] as Track[];

  @Output() public saveVideoRef: EventEmitter<Track> = new EventEmitter();
  @Output() public trackChange: EventEmitter<Track | null> = new EventEmitter();
  @Output() public closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private logger: LoggerService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(event: Event): void {
    this.logger.debug('onSubmit', this.track);
    event.preventDefault();

    if (this.save === true && this.track != null) {
      this.saveVideoRef.emit(this.track);
    }

    this.trackChange.emit(this.track);
    this.closeModal.emit();
  }

  onCancel(event?: Event): void {
    this.logger.debug('onCancel');

    if (event) {
      event.preventDefault();
    }

    this.closeModal.emit();
  }
}
