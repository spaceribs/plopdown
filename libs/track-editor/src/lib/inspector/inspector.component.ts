import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@ng-stack/forms';
import { Cue } from '@plopdown/plopdown-cues';
import { PlopdownFileHeaders } from '@plopdown/plopdown-file';

@Component({
  selector: 'plopdown-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent {
  public readonly headerForm: FormGroup<PlopdownFileHeaders> = new FormGroup<PlopdownFileHeaders>({
    _id: new FormControl(),
    _rev: new FormControl(),
    type: new FormControl(),
    title: new FormControl(),
    for: new FormControl(),
    created: new FormControl(),
    updated: new FormControl(),
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

  cueForm: FormGroup = new FormGroup({});

  @Input()
  public set header(val: PlopdownFileHeaders | null) {
    this.headerForm.reset();

    if (val == null) {
      return;
    }
    
    this.headerForm.patchValue(val);
  }
  @Output() public headerChange: EventEmitter<PlopdownFileHeaders> =
    new EventEmitter();

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue> =
    new EventEmitter();

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
}
