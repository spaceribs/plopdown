import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Cue } from '@plopdown/plopdown-cues';
import { PlopdownFileHeaders, PlopdownSchema } from '@plopdown/plopdown-file';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

type JSONSchemaProperties = {
  [key: string]: JSONSchema7Definition;
};

@Component({
  selector: 'plopdown-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent {
  headerForm: FormGroup = new FormGroup({});
  cueForm: FormGroup = new FormGroup({});

  headerOptions: FormlyFormOptions = {};
  cueOptions: FormlyFormOptions = {};

  headerFields: FormlyFieldConfig[];
  cueFields: FormlyFieldConfig[];

  @Input() public header: PlopdownFileHeaders | null = null;
  @Output() public headerChange: EventEmitter<PlopdownFileHeaders> =
    new EventEmitter();

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue> =
    new EventEmitter();

  constructor(formlyJsonschema: FormlyJsonschema) {
    const fileHeaderSchema = {
      ...(PlopdownSchema as JSONSchema7),
      properties: {
        ...(PlopdownSchema.definitions.PlopdownFileHeaders
          .properties as JSONSchemaProperties),
      },
    };

    const fileCuesSchema = {
      ...(PlopdownSchema as JSONSchema7),
      properties: {
        ...(PlopdownSchema.definitions.Cue
          .properties as JSONSchemaProperties),
      },
    };

    const headerConfig = formlyJsonschema.toFieldConfig(fileHeaderSchema, { map: (field, source) => {
      if (field.templateOptions == null) {
        field.templateOptions = {};
      }

      switch (source.format) {
        case 'readonly':
          field.templateOptions.readonly = true;
          break;
        
        case 'date-time':
          field.type = 'datetime-local';
          break;

        case 'uri':
          field.type = 'url';
          break;
      }

      return field;
    } });

    const cueConfig = formlyJsonschema.toFieldConfig(fileCuesSchema, { map: (field, source) => {
      console.log(field, source);
      return field;
    } });
    console.log(cueConfig);

    this.headerFields = [headerConfig];
    this.cueFields = [cueConfig];
  }

  public submitHeader() {
    if (this.headerForm.valid) {
      this.headerChange.emit(this.headerForm.value);
    }
  }

  public submitCue() {
    if (this.cueForm.valid) {
      this.cueSelectedChange.emit(this.cueForm.value);
    }
  }
}
