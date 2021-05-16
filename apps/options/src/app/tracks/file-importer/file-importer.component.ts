import { UnsavedVideoRef } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { mdiFileOutline, mdiFileCheck } from '@mdi/js';
import { Track } from '@plopdown/tracks';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'plopdown-file-importer',
  templateUrl: './file-importer.component.html',
  styleUrls: ['./file-importer.component.scss'],
})
export class FileImporterComponent implements OnInit, OnDestroy {
  public fileReader = new FileReader();
  public mdiFileOutline = mdiFileOutline;
  public mdiFileCheck = mdiFileCheck;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<
    PouchDB.Core.PostDocument<Track>
  > = new EventEmitter();
  @Output() addVideoRef: EventEmitter<
    PouchDB.Core.PostDocument<UnsavedVideoRef>
  > = new EventEmitter();

  private subs: Subscription = new Subscription();

  public track: PouchDB.Core.PostDocument<Track> | null = null;
  public videoRef: PouchDB.Core.PostDocument<UnsavedVideoRef> | null = null;
  public fileLoaded$: Observable<PlopdownFile>;
  public saving = false;
  public fileRefs: string[] = [] as string[];
  public trackError: string | null = null;

  constructor(
    private fileService: PlopdownFileService,
    private logger: LoggerService
  ) {
    this.fileLoaded$ = fromEvent(this.fileReader, 'load').pipe(
      map(() => {
        return this.fileService.decode(this.fileReader.result as string);
      })
    );
  }

  ngOnInit() {
    const fileLoadedSub = this.fileLoaded$.subscribe({
      next: (plopfile) => {
        this.logger.debug('Plopdown track loaded', plopfile);

        this.track = {
          _id: plopfile.headers._id,
          title: plopfile.headers.title,
          for: plopfile.headers.for,
          created: plopfile.headers.created,
          updated: plopfile.headers.updated,
          thumbnail: plopfile.headers.thumbnail,
          url: plopfile.headers.url,
          language: plopfile.headers.language,
          license: plopfile.headers.license,
          authors: plopfile.headers.authors,
          cues: plopfile.cues,
        };

        this.videoRef = {
          title: plopfile.headers.title,
          xpath: plopfile.headers.xpath,
          track: {
            title: plopfile.headers.title,
            _id: plopfile.headers._id,
          },
          duration: plopfile.headers.duration,
          frameTitle: plopfile.headers.frameTitle,
          frameOrigin: plopfile.headers.frameOrigin,
          framePath: plopfile.headers.framePath,
          frameSearch: plopfile.headers.frameSearch,
        };

        if (plopfile.files) {
          this.fileRefs = plopfile.files;
        }
      },
      error: (err) => {
        this.logger.error('Could not load plopdown track', err);
      },
    });
    this.subs.add(fileLoadedSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onAddTrack(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files == null) {
      return;
    }

    const trackFile = files[0];
    this.fileReader.readAsText(trackFile);
  }

  onAddFile(fileName: string, event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files == null || this.track == null) {
      return;
    }

    const file = files[0];

    this.track._attachments = {
      ...this.track._attachments,
      [fileName]: {
        content_type: file.type,
        data: file,
      },
    };
  }

  getAccept(fileName: string) {
    const fileParts = fileName.split('.');
    return `.${fileParts[fileParts.length - 1]}`;
  }

  getFile(files?: FileList | null): File | null {
    if (files == null || files[0] == null) {
      return null;
    }
    return files[0];
  }

  getFileName(files?: FileList | null) {
    if (files == null || files[0] == null) {
      return 'N/A';
    }
    return files[0].name;
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    if (this.track != null && this.videoRef != null) {
      this.save.emit(this.track);
      this.addVideoRef.emit(this.videoRef);
      this.saving = true;
    }
  }

  isValid() {
    if (this.track == null) {
      return false;
    }

    if (this.track._attachments == null) {
      return false;
    }

    if (this.fileRefs.length !== Object.keys(this.track._attachments).length) {
      return false;
    }

    return true;
  }
}
