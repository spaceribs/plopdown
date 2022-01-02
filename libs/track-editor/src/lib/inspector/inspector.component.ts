import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@ng-stack/forms';
import {
  Cue,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { PlopdownFileHeaders } from '@plopdown/plopdown-file';

export const PLOPDOWN_FORM_GROUPS: {
  [key in PlopdownTemplateType]: FormGroup<PlopdownTemplate>;
} = {
  [PlopdownTemplateType.Info]: new FormGroup<PlopdownTemplate>({
    type: new FormControl(PlopdownTemplateType.Info),
    title: new FormControl(),
    url: new FormControl(),
    authors: new FormArray([]),
  }),
  [PlopdownTemplateType.Plop]: new FormGroup<Required<PlopdownTemplate>>({
    type: new FormControl(PlopdownTemplateType.Plop),
    top: new FormControl(),
    left: new FormControl(),
    width: new FormControl(),
    desc: new FormControl(),
    footnotes: new FormArray([]),
    icons: new FormArray([]),
  }),
  [PlopdownTemplateType.Audio]: new FormGroup<PlopdownTemplate>({
    type: new FormControl(PlopdownTemplateType.Audio),
    top: new FormControl(),
    left: new FormControl(),
    title: new FormControl(),
    url: new FormControl(''),
    offset_time: new FormControl(),
  }),
  [PlopdownTemplateType.Shape]: new FormGroup<PlopdownTemplate>({
    type: new FormControl(PlopdownTemplateType.Shape),
    title: new FormGroup({
      text: new FormControl(),
      show: new FormControl(),
    }),
    top: new FormControl(),
    left: new FormControl(),
    width: new FormControl(),
    height: new FormControl(),
    viewBox: new FormControl(),
    elements: new FormArray([]),
    blend: new FormControl(),
  }),
};

@Component({
  selector: 'plopdown-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent {
  public PlopdownTemplateType = PlopdownTemplateType;

  public headerModel: PlopdownFileHeaders | null = null;

  public readonly cueForm: FormGroup<Cue> = new FormGroup<Cue>({
    startTime: new FormControl(),
    endTime: new FormControl(),
    id: new FormControl(),
    layer: new FormControl(),
    data: new FormGroup<any>({}),
  });

  public readonly headerForm: FormGroup<PlopdownFileHeaders> =
    new FormGroup<PlopdownFileHeaders>({
      _id: new FormControl('', { validators: [Validators.required] }),
      _rev: new FormControl('', { validators: [Validators.required] }),
      created: new FormControl('', { validators: [Validators.required] }),
      updated: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl(),
      title: new FormControl(),
      for: new FormControl(),
      thumbnail: new FormControl(),
      url: new FormControl(),
      language: new FormControl(),
      license: new FormControl(),
      authors: new FormControl(),
      frameOrigin: new FormControl(),
      framePath: new FormControl(),
      frameSearch: new FormControl(),
      frameTitle: new FormControl(),
      xpath: new FormControl(),
      duration: new FormControl(),
    });

  @Input()
  public set header(val: PlopdownFileHeaders | null) {
    this.headerModel = val;

    this.headerForm.reset();

    if (val == null) {
      return;
    }

    this.headerForm.patchValue(val);
  }
  @Output() public headerChange: EventEmitter<PlopdownFileHeaders> =
    new EventEmitter();

  public cueSelectedModel: Cue | null = null;
  @Input()
  public set cueSelected(val: Cue | null) {
    this.cueSelectedModel = val;

    this.cueForm.reset();

    if (val == null) {
      return;
    }

    this.updateCueType(val.data.type);

    this.cueForm.patchValue(val);
  }

  @Output() public cueSelectedChange: EventEmitter<Cue> = new EventEmitter();

  public submitHeader() {
    if (this.headerForm.valid) {
      this.headerChange.emit(this.headerForm.value);
    }
  }

  public submitCue() {
    // if (this.cueForm.valid) {
    //   this.cueSelectedChange.emit(this.cueForm.value);
    // }
  }

  public updateCueType(type?: PlopdownTemplateType) {
    if (type == null) {
      return;
    }
    this.cueForm.setControl('data', PLOPDOWN_FORM_GROUPS[type]);
  }
}
