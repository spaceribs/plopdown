import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'plopdown-field-input',
  templateUrl: `field-input.component.html`,
  styleUrls: [`field-input.component.scss`],
})
export class FieldInputComponent extends FieldType {
  public get fieldType() {
    switch (this.field.type) {
      case 'datetime-local':
        return 'datetime-local';
        
      case 'url':
        return 'url';
    
      default:
        return 'text';
    }
  }
}
