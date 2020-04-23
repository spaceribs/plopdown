import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track } from '@plopdown/tracks';
import { Observable } from 'rxjs';

@Component({
  selector: 'plopdown-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly track$: Observable<Track>;
  public overlayShown = false;

  @ViewChild('exampleVideo') exampleVideo: ElementRef<HTMLVideoElement>;

  constructor(http: HttpClient, fileService: PlopdownFileService) {
    this.track$ = http
      .get('/assets/minnie_facts.vtt', {
        responseType: 'text'
      })
      .pipe(
        map(raw => {
          const file: PlopdownFile = fileService.decode(raw);

          const track: Track = {
            id: file.headers.id,
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues
          };

          return track;
        })
      );
  }

  ngOnInit(): void {}

  public removeOverlay() {
    this.overlayShown = false;
  }

  public onPlopify() {
    this.overlayShown = true;
  }
}
