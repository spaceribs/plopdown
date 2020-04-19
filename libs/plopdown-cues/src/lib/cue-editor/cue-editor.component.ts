import { Component, OnInit, Input } from '@angular/core';
import { PlopdownCue } from '../models/plopdown-cue.model';

@Component({
  selector: 'plopdown-cue-editor',
  templateUrl: './cue-editor.component.html',
  styleUrls: ['./cue-editor.component.scss']
})
export class CueEditorComponent implements OnInit {
  @Input() cues: PlopdownCue[] = [];

  constructor() {}

  ngOnInit(): void {}
}
