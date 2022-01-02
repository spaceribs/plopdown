import { Component, Input } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import {
  PlopdownPlop,
  PlopdownTemplateType,
  PlopFootnote,
  PlopIcon,
} from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-plop-form',
  templateUrl: './plop-form.component.html',
  styleUrls: ['./plop-form.component.scss'],
})
export class PlopFormComponent {
  @Input()
  public templateGroup = new FormGroup<Required<PlopdownPlop>>({
    type: new FormControl(PlopdownTemplateType.Plop),
    top: new FormControl(),
    left: new FormControl(),
    width: new FormControl(),
    desc: new FormControl(),
    footnotes: new FormArray<PlopFootnote>([]),
    icons: new FormArray([]),
  });

  public addFootnote(array: FormArray<PlopFootnote>): void {
    array.push(
      new FormGroup<PlopFootnote>({
        title: new FormControl(),
        url: new FormControl(),
      })
    );
  }

  public removeFootnote(array: FormArray<PlopFootnote>, index: number) {
    array.removeAt(index);
  }

  public addIcon(array: FormArray<PlopIcon>): void {
    array.push(
      new FormGroup<PlopIcon>({
        top: new FormControl(),
        left: new FormControl(),
        size: new FormControl(),
        rotate: new FormControl(),
        emoji: new FormControl(),
      })
    );
  }

  public removeIcon(array: FormArray<PlopIcon>, index: number) {
    array.removeAt(index);
  }

  public setEmoji(control: FormControl<PlopIcon['emoji']>, event: EmojiEvent) {
    console.log(event);
  }
}
