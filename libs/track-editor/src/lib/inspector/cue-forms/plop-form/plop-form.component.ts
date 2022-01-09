import { Component, Input, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import {
  PlopFootnote,
  PlopIcon,
  PlopdownPlop,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { EventEmitter } from '@angular/core';
import { PlopFormGroup } from './plop-form.form-group';
import { Subscription } from 'rxjs';

@Component({
  selector: 'plopdown-plop-form',
  templateUrl: './plop-form.component.html',
  styleUrls: ['./plop-form.component.scss'],
})
export class PlopFormComponent implements OnDestroy {
  private subs = new Subscription();
  public templateGroup = PlopFormGroup;

  @Input()
  public set data(val: PlopdownTemplate | null) {
    this.templateGroup.reset(undefined, { emitEvent: false });

    if (val == null || val.type !== PlopdownTemplateType.Plop) {
      return;
    }

    this.templateGroup.patchValue(val, { emitEvent: false });
  }
  @Output() public dataChange: EventEmitter<PlopdownPlop> = new EventEmitter();

  constructor() {
    const valueChangeSub = this.templateGroup.valueChanges.subscribe((val) => {
      if (this.templateGroup.invalid) {
        return;
      }

      this.dataChange.emit(val);
    });
    this.subs.add(valueChangeSub);
  }

  ngOnDestroy(): void {}

  public addFootnote(array: FormArray<PlopFootnote>): void {
    array.push(
      new FormGroup<PlopFootnote>({
        title: new FormControl(),
        url: new FormControl(),
      })
    );
  }

  public removeFootnote(array: FormArray<PlopFootnote>, index: number) {
    array.removeAt(index);
  }

  public addIcon(array: FormArray<PlopIcon>): void {
    array.push(
      new FormGroup<PlopIcon>({
        top: new FormControl(),
        left: new FormControl(),
        size: new FormControl(),
        rotate: new FormControl(),
        emoji: new FormControl(),
      })
    );
  }

  public removeIcon(array: FormArray<PlopIcon>, index: number) {
    array.removeAt(index);
  }
}
