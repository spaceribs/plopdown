import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Cue } from '@plopdown/plopdown-cues';
import { PlopdownFileHeaders, PlopdownSchema } from '@plopdown/plopdown-file';

@Component({
  selector: 'plopdown-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    this.formlyJsonschema.toFieldConfig({
      ...(PlopdownSchema as any),
      properties: {
        ...(PlopdownSchema.definitions.PlopdownFileHeaders.properties as any),
      },
    }),
  ];

  @Input() public header: PlopdownFileHeaders | null = null;
  @Output() public headerChange: EventEmitter<PlopdownFileHeaders | null> =
    new EventEmitter();

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue | null> =
    new EventEmitter();

  constructor(private formlyJsonschema: FormlyJsonschema) {}

  ngOnInit(): void {}

  public submit() {
    console.log('submit');
  }
}
