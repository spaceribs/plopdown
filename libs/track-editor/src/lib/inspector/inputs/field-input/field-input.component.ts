import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'plopdown-field-input',
  templateUrl: `field-input.component.html`,
  styleUrls: [`field-input.component.scss`],
})
export class FieldInputComponent extends FieldType {}
