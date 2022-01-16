import { Component, Input, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
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

    if (
      val.icons &&
      val.icons.length !== this.templateGroup.controls.icons.length
    ) {
      val.icons.forEach((icon, index) => {
        this.templateGroup.controls.icons.setControl(
          index,
          new FormGroup({
            top: new FormControl(icon.top),
            left: new FormControl(icon.left),
            emoji: new FormControl(icon.emoji),
            rotate: new FormControl(icon.rotate),
            size: new FormControl(icon.size),
          })
        );
      });
    }

    this.templateGroup.patchValue(val, { emitEvent: false });
  }
  @Output() public dataChange: EventEmitter<PlopdownPlop> = new EventEmitter();
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

  ngOnDestroy(): void {}

  public addFootnote(array: FormArray<PlopFootnote>): void {
    console.log(array);
    array.push(
      new FormGroup<PlopFootnote>({
        title: new FormControl('', { validators: [Validators.required] }),
        url: new FormControl('', { validators: [Validators.required] }),
      })
    );
    this.formUpdate.emit();
  }

  public removeFootnote(array: FormArray<PlopFootnote>, index: number) {
    array.removeAt(index);
    this.formUpdate.emit();
  }

  public addIcon(array: FormArray<PlopIcon>): void {
    array.push(
      new FormGroup<PlopIcon>({
        top: new FormControl(50, { validators: [Validators.required] }),
        left: new FormControl(50, { validators: [Validators.required] }),
        size: new FormControl(150, { validators: [Validators.required] }),
        rotate: new FormControl(0, { validators: [Validators.required] }),
        emoji: new FormControl('❔', { validators: [Validators.required] }),
      })
    );
    this.formUpdate.emit();
  }

  public removeIcon(array: FormArray<PlopIcon>, index: number) {
    array.removeAt(index);
    this.formUpdate.emit();
  }
}
