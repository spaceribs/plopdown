import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'plopdown-field-input',
  templateUrl: `multischema-input.component.html`,
  styleUrls: [`multischema-input.component.scss`],
})
export class MultischemaInputComponent extends FieldType {
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
