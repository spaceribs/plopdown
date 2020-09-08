import { LzStringService } from '@plopdown/lz-string';
import { LocationService } from '@plopdown/window-ref';
import { Injectable } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track } from '@plopdown/tracks';
import { VideoRef } from '@plopdown/video-refs';
import { Observable } from 'rxjs';

@Injectable()
export class HashVideoRefsService {
  private videoRef$: Observable<VideoRef>;
  private track$: Observable<Track>;

  constructor(
    location: LocationService,
    fileService: PlopdownFileService,
    lzstring: LzStringService
  ) {
    const file$ = location.getHash().pipe(
      filter((hash: string) => hash.startsWith('#plopdown:')),
      map((hash: string) => hash.split(':')[1]),
      map((compressedFile) => lzstring.decompressURI(compressedFile)),
      map((rawFile) => fileService.decode(rawFile)),
      filter((video) => video != null),
      shareReplay(1)
    );

    this.videoRef$ = file$.pipe(
      map((file) => HashVideoRefsService.hashToVideoRef(file))
    );

    this.track$ = file$.pipe(
      map((file) => HashVideoRefsService.hashToTrack(file))
    );
  }

  private static hashToTrack(file: PlopdownFile): Track {
    const s: Track = {
      _id: file.headers._id,
      title: file.headers.title,
      for: file.headers.for,
      created: file.headers.created,
      thumbnail: file.headers.thumbnail,
      authors: file.headers.authors,
      language: file.headers.language,
      license: file.headers.license,
      cues: file.cues,
    };

    return s;
  }

  private static hashToVideoRef(file: PlopdownFile): VideoRef {
    const v: VideoRef = {
      _id: file.headers._id,
      _rev: 'hash',
      title: file.headers.title,
      xpath: file.headers.xpath,
      duration: file.headers.duration,
      track: {
        _id: file.headers._id,
        title: file.headers.title,
      },
    };

    return v;
  }

  public getVideoRef$() {
    return this.videoRef$;
  }

  public getTrack$() {
    return this.track$;
  }
}
