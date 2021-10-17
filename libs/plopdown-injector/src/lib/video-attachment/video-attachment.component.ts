import { LoggerService } from '@plopdown/logger';
import {
  XPathService,
  WindowRefService,
  LocationService,
} from '@plopdown/window-ref';
import { HashVideoRefsService } from '../hash-video-refs.service';
import { Track, TracksService } from '@plopdown/tracks';
import {
  Component,
  OnInit,
  Input,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  OnDestroy,
  ComponentFactoryResolver,
  ErrorHandler,
  ComponentRef,
} from '@angular/core';
import {
  Subscription,
  fromEvent,
  ReplaySubject,
  Subject,
  BehaviorSubject,
  combineLatest,
  of,
  merge,
  Observable,
} from 'rxjs';
import {
  map,
  filter,
  switchMap,
  mapTo,
  distinctUntilChanged,
  shareReplay,
  scan,
  tap,
} from 'rxjs/operators';
import { PlopdownEmbedComponent } from '@plopdown/plopdown-embed';
import { VideoRef, VideoRefsService } from '@plopdown/video-refs';

const INJECTION_MATCHES = [
  // YouTube
  '#movie_player.html5-video-player',
  // Netflix
  'div.watch-video--player-view',
];

const DURATION_FUZZ_SEC = 20;

@Component({
  selector: 'plopdown-video-attachment',
  template: '',
})
export class VideoAttachmentComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private embedRef$: Observable<ComponentRef<PlopdownEmbedComponent>>;
  private embedRefDom$: Observable<HTMLElement>;
  private track$: BehaviorSubject<Track | null> =
    new BehaviorSubject<Track | null>(null);
  private tracks$: Observable<Track[]>;
  private hashVideoRef$: Observable<VideoRef>;
  private hashTrack$: Observable<Track>;

  private videoElem$: Subject<HTMLVideoElement> = new ReplaySubject(1);
  @Input() public set videoElem(videoElem: HTMLVideoElement) {
    this.videoElem$.next(videoElem);
  }

  private videoElemLoaded$: Observable<HTMLVideoElement>;
  private videoRef$: Observable<Partial<VideoRef>>;
  private videoRefs$: Observable<VideoRef[]>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private errorHandler: ErrorHandler,
    private appRef: ApplicationRef,
    private hashService: HashVideoRefsService,
    private windowRef: WindowRefService,
    private location: LocationService,
    private injector: Injector,
    private logger: LoggerService,
    private videoRefService: VideoRefsService,
    tracksService: TracksService,
    private xpath: XPathService
  ) {
    this.tracks$ = tracksService.getTracks();

    this.hashVideoRef$ = combineLatest([
      this.hashService.getVideoRef$(),
      this.videoElem$,
    ]).pipe(
      map(([videoRef, videoElem]) => {
        const matchingElem = xpath.getElement(videoRef.xpath);
        if (matchingElem === videoElem) {
          return videoRef;
        }
        return null;
      }),
      filter((videoRef): videoRef is VideoRef => videoRef != null)
    );

    this.hashTrack$ = this.hashService.getTrack$();

    this.videoElemLoaded$ = this.videoElem$.pipe(
      filter((videoElem) => videoElem != null),
      switchMap((videoElem) =>
        merge(
          fromEvent(videoElem, 'onloadedmetadata').pipe(mapTo(videoElem)),
          fromEvent(videoElem, 'onplay').pipe(mapTo(videoElem)),
          of(videoElem)
        )
      ),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const embedFactory = this.componentFactoryResolver.resolveComponentFactory(
      PlopdownEmbedComponent
    );

    this.embedRef$ = this.videoElemLoaded$.pipe(
      map(() => {
        return embedFactory.create(this.injector);
      }),
      shareReplay(1)
    );

    this.embedRefDom$ = this.embedRef$.pipe(
      map((embedRef) => {
        return (embedRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
      }),
      shareReplay(1)
    );

    this.videoRef$ = this.videoElemLoaded$.pipe(
      map((elem) => {
        const doc = this.windowRef.getDocument();
        const loc = this.windowRef.getLocation();
        return {
          xpath: this.xpath.getXPath(elem) as string,
          title: elem.title || doc.title || 'Untitled',
          duration: elem.duration.toString(),
          frameTitle: doc.title,
          frameOrigin: loc.origin,
          framePath: loc.pathname,
          frameSearch: loc.search,
        };
      })
    );

    this.videoRefs$ = this.videoRef$.pipe(
      switchMap((videoRef) => {
        return this.videoRefService.findVideoRefs(videoRef);
      })
    );

    this.videoRefs$ = combineLatest([
      videoRefService.getVideoRefs(),
      location.getLocation(),
    ]).pipe(
      map(([refs, loc]) => this.urlMatches(refs, loc)),
      filter((refs) => refs.length > 0),
      tap((refs) => {
        logger.info('VideoRefs Matched URLs', refs);
      })
    );
  }

  ngOnInit(): void {
    const attachSub = combineLatest([
      this.embedRef$,
      this.videoElemLoaded$,
      this.track$,
      this.tracks$,
      this.embedRefDom$,
    ]).subscribe({
      next: ([embedRef, videoElem, track, tracks, domRef]) => {
        this.appRef.attachView(embedRef.hostView);
        this.attachmentPlacing(videoElem, domRef);
        embedRef.instance.videoElem = videoElem;
        embedRef.instance.tracks = tracks;
        embedRef.instance.track = track;
        embedRef.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(attachSub);

    const changeTrackSub = this.embedRef$
      .pipe(
        switchMap((embedRef) => {
          return embedRef.instance.trackChange.asObservable();
        })
      )
      .subscribe({
        next: (track) => {
          this.track$.next(track);
        },
      });
    this.subs.add(changeTrackSub);

    const removeEmbedSub = this.embedRef$
      .pipe(
        switchMap((embedRef) => {
          return embedRef.instance.remove.pipe(mapTo(embedRef));
        })
      )
      .subscribe({
        next: (embedRef) => {
          const domElem = (embedRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
          domElem.remove();
          embedRef.destroy();
        },
      });
    this.subs.add(removeEmbedSub);

    const saveVideoRef$: Observable<Track> = this.embedRef$.pipe(
      switchMap((embed) => {
        return embed.instance.saveVideoRef.asObservable();
      })
    );

    const saveVideoRefSub = combineLatest([saveVideoRef$, this.videoRef$])
      .pipe(
        map(([track, videoRef]) => {
          return {
            ...videoRef,
            track: {
              title: track.title,
              _id: track._id,
            },
          } as VideoRef;
        }),
        switchMap((videoRef) => {
          return this.videoRefService.addVideoRef(videoRef);
        })
      )
      .subscribe({
        next: (savedVideoRef) => {
          this.logger.debug('Saved a video reference', savedVideoRef);
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(saveVideoRefSub);

    const autoHashTrackSub = this.hashVideoRef$
      .pipe(
        switchMap(() => {
          return this.hashTrack$;
        })
      )
      .subscribe({
        next: (track) => {
          this.logger.debug('Auto initialized track from hash payload.', track);
          this.track$.next(track);
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(autoHashTrackSub);

    const match$ = combineLatest([this.videoRefs$, this.videoElemLoaded$]).pipe(
      map(([refs, elem]) => this.elemMatches(refs, elem)),
      filter((ref): ref is VideoRef => ref != null),
      tap((ref) => {
        this.logger.info('VideoRef Matched Element', ref);
      })
    );

    const autoSavedTrackSub = combineLatest([match$, this.tracks$])
      .pipe(
        map(([ref, tracks]) => {
          return tracks.find((track) => {
            return track._id === ref.track?._id;
          });
        }),
        filter((track): track is Track => track != null)
      )
      .subscribe({
        next: (track) => {
          this.logger.debug('Auto initialized track from hash payload.', track);
          this.track$.next(track);
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(autoSavedTrackSub);

    const removeSub = this.embedRef$
      .pipe(
        scan(
          (acc, next) => {
            acc.shift();
            acc.push(next);
            return acc;
          },
          [null, null] as Array<ComponentRef<PlopdownEmbedComponent> | null>
        ),
        map((acc) => acc[0]),
        filter(
          (acc): acc is ComponentRef<PlopdownEmbedComponent> => acc != null
        )
      )
      .subscribe({
        next: (prevEmbed) => {
          this.appRef.detachView(prevEmbed.hostView);
          prevEmbed.destroy();
          prevEmbed.location.nativeElement.remove();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(removeSub);
  }

  ngOnDestroy(): void {
    const destroySub = this.embedRef$.subscribe({
      next: (embedRef) => {
        this.appRef.detachView(embedRef.hostView);
        embedRef.destroy();
        embedRef.location.nativeElement.remove();
        this.subs.unsubscribe();
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(destroySub);
  }

  private frameSearch(locSearch: string | null, frameSearch?: string): boolean {
    let searchMatch = true;
    if (frameSearch && locSearch) {
      const frameParams = new URLSearchParams(frameSearch);
      const locParams = new URLSearchParams(locSearch);

      frameParams.forEach((val, key) => {
        const locVal = locParams.get(key);

        if (val !== locVal) {
          searchMatch = false;
        }
      });
    }
    return searchMatch;
  }

  private urlMatches(refs: VideoRef[], loc: Location) {
    return refs.filter((ref) => {
      return (
        ref.frameOrigin === loc.origin &&
        ref.framePath?.startsWith(loc.pathname) &&
        this.frameSearch(loc.search, ref.frameSearch)
      );
    });
  }

  private elemMatch(ref: VideoRef, elem: HTMLVideoElement) {
    const elemDuration = Math.floor(elem.duration);
    let elemMatch = elem;

    if (ref.xpath) {
      elemMatch = this.xpath.getElement<HTMLVideoElement>(ref.xpath);
    }

    if (ref.duration != null) {
      const duration = parseInt(ref.duration, 10);

      if (Math.abs(elemDuration - duration) > DURATION_FUZZ_SEC) {
        this.logger.debug("Durations didn't match", ref.duration, elemDuration);
        return false;
      }
    }

    if (elem !== elemMatch) {
      this.logger.debug("XPaths didn't match", elemMatch, elem);
      return false;
    }

    return true;
  }

  private elemMatches(refs: VideoRef[], elem: HTMLVideoElement) {
    return refs.find((ref) => {
      return this.elemMatch(ref, elem);
    });
  }

  private attachmentPlacing(videoElem: HTMLVideoElement, domRef: HTMLElement) {
    // Original implementation put the stage next to the video:
    // videoElem?.offsetParent?.append(domRef);
    // For Netflix, a large clickable area is placed above the entire video
    // to capture pressing play/pause.

    const videoCoords = videoElem.getBoundingClientRect();
    const halfWidth = Math.max(videoCoords.width / 2, 320);
    const halfHeight = Math.max(videoCoords.height / 2, 240);
    const videoX = Math.max(videoCoords.x, 0);
    const videoY = Math.max(videoCoords.y, 0);
    const stack = document.elementsFromPoint(
      videoX + halfWidth,
      videoY + halfHeight
    );

    const injectionParent =
      stack.find((elem) => {
        return (
          INJECTION_MATCHES.find((match) => {
            return elem.matches(match);
          }) != null
        );
      }) ||
      videoElem.offsetParent ||
      document.body;

    injectionParent.append(domRef);
  }
}
