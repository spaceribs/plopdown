import { SavedVideoRef } from '@plopdown/video-refs';
import { Track, SavedTrack } from '@plopdown/tracks';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { LoggerService } from '@plopdown/logger';
import { WindowRefService } from '@plopdown/window-ref';
import {
  ContentScriptPubService,
  BackgroundSubService,
} from '@plopdown/messages';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { map, scan, tap } from 'rxjs/operators';
import { Observable, Observer, merge } from 'rxjs';

@Component({
  selector: 'plopdown-cs',
  template: `
    <plopdown-content-scanner></plopdown-content-scanner>
    <plopdown-video-attachments
      [videoRefs]="videoRefs$ | async"
    ></plopdown-video-attachments>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  public videoRefs$: Observable<Map<SavedVideoRef['_id'], SavedVideoRef>>;

  constructor(
    private bgSub: BackgroundSubService,
    private logger: LoggerService,
    private fileService: PlopdownFileService,
    private window: WindowRefService,
    private ref: ChangeDetectorRef,
  ) {

    function importVTT(raw: string): PlopdownFile {
      const f: PlopdownFile = fileService.decode(raw);
      return f;
    }

    this.videoRefs$ = merge(window.getHashValueFound().pipe(
      map(importVTT),
      map(this.fileToVideoRef),
    ), this.bgSub.getVideoRefsFound().pipe(
      map((res) => res.args[0]),
    )).pipe(
      scan((refs, videoRefs) => {
        videoRefs.forEach((videoRef) => {
          refs.set(videoRef['_id'], videoRef);
        });
        return refs;
      }, new Map<SavedVideoRef['_id'], SavedVideoRef>()),
      tap(_ => setTimeout(() => this.ref.detectChanges(), 100)),
    );
  }


  private fileToVideoRef(file: PlopdownFile): [SavedVideoRef] {
    const s: SavedTrack = {
      _id: "local",
      _rev: "local",
      title: file.headers.title,
      for: file.headers.for,
      created: file.headers.created,
      thumbnail: file.headers.thumbnail,
      authors: file.headers.authors,
      language: file.headers.language,
      license: file.headers.license,
      cues: file.cues,
    };

    const v: SavedVideoRef = {
      _id: "local",
      _rev: "local",
      xpath: file.headers.xpath,
      title: file.headers.for,
      duration: 0,
      frameOrigin: "",
      track: s,
      frameTitle: null,
      framePath: null,
      frameSearch: null,
    }
    return [v]
  }

  ngAfterViewInit(): void {
    this.logger.debug('Content script ready');
  }
}
