import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@ng-stack/forms';
import { InfoFormGroup } from './info-form.form-group';

@Component({
  selector: 'plopdown-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent {
  @Input()
  public templateGroup = InfoFormGroup;

  public addAuthor(array: FormArray<string>): void {
    array.push(new FormControl());
  }

  public removeAuthor(array: FormArray<string>, index: number) {
    array.removeAt(index);
  }
}
