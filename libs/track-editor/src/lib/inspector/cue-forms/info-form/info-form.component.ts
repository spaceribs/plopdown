import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { Subscription } from 'rxjs';
import {
  PlopdownInfo,
  PlopdownPlop,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { InfoFormGroup } from './info-form.form-group';

@Component({
  selector: 'plopdown-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent {
  private subs = new Subscription();
  public templateGroup = InfoFormGroup;

  @Input()
  public set data(val: PlopdownTemplate | null) {
    this.templateGroup.reset(undefined, { emitEvent: false });

    if (val == null || val.type !== PlopdownTemplateType.Info) {
      return;
    }

    if (
      val.authors &&
      val.authors.length !== this.templateGroup.controls.authors.length
    ) {
      val.authors.forEach((author, index) => {
        this.templateGroup.controls.authors.setControl(
          index,
          new FormControl(author, [Validators.required])
        );
      });
    }

    this.templateGroup.patchValue(val, { emitEvent: false });
  }
  @Output() public dataChange: EventEmitter<PlopdownInfo> = new EventEmitter();
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

  public addAuthor(array: FormArray<string>): void {
    array.push(new FormControl());
    this.formUpdate.emit();
  }

  public removeAuthor(array: FormArray<string>, index: number) {
    array.removeAt(index);
    this.formUpdate.emit();
  }
}
