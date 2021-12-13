import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'plopdown-object-input',
  templateUrl: './object-input.component.html',
  styleUrls: ['./object-input.component.scss'],
})
export class ObjectInputComponent extends FieldType {}
