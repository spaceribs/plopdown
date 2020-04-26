import { Component, OnInit, Input } from '@angular/core';
import { Cue } from '../models/plopdown-cue.model';

@Component({
  selector: 'plopdown-cue-editor',
  templateUrl: './cue-editor.component.html',
  styleUrls: ['./cue-editor.component.scss']
})
export class CueEditorComponent implements OnInit {
  @Input() cues: Cue[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.cues);
  }
}
