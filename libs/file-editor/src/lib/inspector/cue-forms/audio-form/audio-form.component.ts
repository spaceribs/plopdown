import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PlopdownAudio,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { AudioFormGroup } from './audio-form.form-group';

@Component({
  selector: 'plopdown-audio-form',
  templateUrl: './audio-form.component.html',
  styleUrls: ['./audio-form.component.scss'],
})
export class AudioFormComponent {
  private subs = new Subscription();
  public templateGroup = AudioFormGroup;

  @Input()
  public set data(val: PlopdownTemplate | null) {
    this.templateGroup.reset(undefined, { emitEvent: false });

    if (val == null || val.type !== PlopdownTemplateType.Audio) {
      return;
    }

    this.templateGroup.patchValue(val, { emitEvent: false });
  }
  @Output() public dataChange: EventEmitter<PlopdownAudio> = new EventEmitter();
  @Output() public formUpdate: EventEmitter<void> = new EventEmitter();

  constructor() {
    const valueChangeSub = this.templateGroup.valueChanges.subscribe((val) => {
      if (this.templateGroup.invalid) {
        return;
      }

      this.dataChange.emit(val);
    });
    this.subs.add(valueChangeSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
