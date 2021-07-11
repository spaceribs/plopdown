import { Injectable } from '@angular/core';
import { LoggerService } from '@plopdown/logger';
import { WindowRefService } from '@plopdown/window-ref';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Track } from './track.model';

@Injectable()
export class TrackService {
  private readonly track$: Subject<Track | null> = new ReplaySubject(1);

  constructor(
    private logger: LoggerService,
    private windowRef: WindowRefService
  ) {
    /**
     * Convert attachments to a map of files or an empty map if
     * there are no attachments.
     */
    this.trackFiles$ = this.getTrack().pipe(
      map((track) => {
        if (track == null || track['_attachments'] == null) {
          return new Map();
        }
        this.logger.debug('Mapping Files', track['_attachments']);
        const files = this.createFileLookup(track['_attachments']);
        this.logger.debug('Files Mapped', files);
        return files;
      }),
      shareReplay(1)
    );
  }

  private trackFiles$: Observable<Map<string, string>>;

  public getTrack() {
    return this.track$.asObservable();
  }

  public setTrack(track: Track | null) {
    this.track$.next(track);
  }

  /**
   * Convert a PouchDB attachment object into a map of locally
   * served blob URLs.
   *
   * @param attachments
   */
  private createFileLookup(attachments: {
    [key: string]: PouchDB.Core.FullAttachment;
  }): Map<string, string> {
    return Object.keys(attachments).reduce((memo, filename) => {
      const attachment = attachments[filename] as PouchDB.Core.FullAttachment;
      const blobUrl = this.windowRef.getURL().createObjectURL(attachment.data);
      memo.set(filename, blobUrl);
      return memo;
    }, new Map<string, string>());
  }

  public getTrackFiles() {
    return this.trackFiles$;
  }
}
