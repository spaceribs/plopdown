import { SavedVideoRef } from '@plopdown/video-refs';
import { Track, SavedTrack } from '@plopdown/tracks';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { LoggerService } from '@plopdown/logger';
import {
  ContentScriptPubService,
  BackgroundSubService,
} from '@plopdown/messages';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { map, scan } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import LZString from 'lz-string'

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
  ) {

    const linkVideoRefs = new Observable(subscriber => {
      if (window.location.hash.startsWith("#plopdown:")) {
        const linkedVideo = LZString.decompressFromEncodedURIComponent(window.location.hash.split(":")[1]);
        subscriber.next(linkedVideo);
      }
      subscriber.complete();
    })

    function convertVideoRef(file: PlopdownFile): [SavedVideoRef] {
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

    function importVTT(input: string): PlopdownFile {
      try {
        const f: PlopdownFile = fileService.decode(input);
        return f
      } catch(e) {
        console.error(e);
        throw e;
      }
    }

    this.videoRefs$ = merge(linkVideoRefs.pipe(
      map(importVTT),
      map(convertVideoRef),
    ), this.bgSub.getVideoRefsFound().pipe(
      map((res) => res.args[0]),
    )).pipe(
      scan((refs, videoRefs) => {
        videoRefs.forEach((videoRef) => {
          refs.set(videoRef['_id'], videoRef);
        });
        return refs;
      }, new Map<SavedVideoRef['_id'], SavedVideoRef>())
    );
  }

  ngAfterViewInit(): void {
    this.logger.debug('Content script ready');
  }
}
