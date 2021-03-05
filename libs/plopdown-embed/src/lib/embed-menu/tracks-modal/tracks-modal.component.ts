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
  @Input() public track: Track | null;

  @Input() public tracks: Track[];

  @Output() public saveVideoRef: EventEmitter<Track> = new EventEmitter();
  @Output() public trackChange: EventEmitter<Track | null> = new EventEmitter();
  @Output() public closeModal: EventEmitter<void> = new EventEmitter();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.save === true) {
      if (this.track != null) {
        this.saveVideoRef.emit(this.track);
      }
    }

    this.trackChange.next(this.track);
    this.closeModal.next();
  }

  onCancel(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeModal.next();
  }
}
