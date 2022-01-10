import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@ng-stack/forms';
import {
  Cue,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { PlopdownFileHeaders } from '@plopdown/plopdown-file';
import { Subscription } from 'rxjs';
import { Layer } from '../layer/layer.models';
import { InfoFormGroup } from './cue-forms/info-form/info-form.form-group';
import { PlopFormGroup } from './cue-forms/plop-form/plop-form.form-group';

export const PLOPDOWN_FORM_GROUPS: {
  [key in PlopdownTemplateType]: FormGroup<PlopdownTemplate>;
} = {
  [PlopdownTemplateType.Info]: InfoFormGroup,
  [PlopdownTemplateType.Plop]: PlopFormGroup,
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
export class InspectorComponent implements OnDestroy {
  private subs = new Subscription();

  @Input() public layers: Layer[] = [];
  public PlopdownTemplateType = PlopdownTemplateType;
  public InfoFormGroup = InfoFormGroup;
  public PlopFormGroup = PlopFormGroup;

  public headerModel: PlopdownFileHeaders | null = null;

  public readonly cueForm: FormGroup<Omit<Cue, 'data'>> = new FormGroup<
    Omit<Cue, 'data'>
  >({
    startTime: new FormControl(),
    endTime: new FormControl(),
    id: new FormControl(),
    layer: new FormControl(),
  });

  public cueData: Cue['data'] | null = null;

  public set cueTemplateType(type: PlopdownTemplateType | null) {
    if (type == null || this.cueData == null) {
      return;
    }

    this.cueData.type = type;
  }

  public get cueTemplateType() {
    if (this.cueData == null) {
      return null;
    }

    return this.cueData.type;
  }

  public readonly headerForm: FormGroup<PlopdownFileHeaders> =
    new FormGroup<PlopdownFileHeaders>({
      _id: new FormControl('', { validators: [Validators.required] }),
      _rev: new FormControl('', { validators: [Validators.required] }),
      created: new FormControl('', { validators: [Validators.required] }),
      updated: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl('plopdown_v2', {
        validators: [Validators.required],
      }),
      title: new FormControl('', { validators: [Validators.required] }),
      for: new FormControl('', { validators: [Validators.required] }),
      thumbnail: new FormControl(),
      url: new FormControl(),
      language: new FormControl(),
      license: new FormControl(),
      authors: new FormControl(),
      frameOrigin: new FormControl(),
      framePath: new FormControl(),
      frameSearch: new FormControl(),
      frameTitle: new FormControl(),
      xpath: new FormControl('', { validators: [Validators.required] }),
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
    this.cueTemplateType = null;
    this.cueData = null;

    if (val == null) {
      return;
    }

    this.cueForm.patchValue(val);
    this.cueData = val.data;
    this.cueTemplateType = val.data.type;
  }

  @Output() public cueSelectedChange: EventEmitter<Cue> = new EventEmitter();

  public submitHeader() {
    if (this.headerForm.valid) {
      this.headerChange.emit(this.headerForm.value);
    }
  }

  public submitCue() {
    if (this.cueForm.invalid || this.cueData == null) {
      return;
    }

    this.cueSelectedChange.emit({
      ...this.cueForm.value,
      data: {
        ...this.cueData,
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
