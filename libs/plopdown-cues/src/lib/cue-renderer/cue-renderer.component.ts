import { LoggerService } from '@plopdown/logger';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ViewContainerRef,
  Type,
  OnDestroy,
  ErrorHandler,
  ChangeDetectorRef,
  AfterViewInit,
  ComponentRef,
  HostBinding,
} from '@angular/core';
import { Cue } from '../models/plopdown-cue.model';
import {
  PLOPDOWN_TEMPLATES,
  PlopdownTemplate,
} from '../models/plopdown-templates.model';
import { PlopdownBaseComponent } from '../models/plopdown-base.component';

type PlopdownComponentType = Type<PlopdownBaseComponent<PlopdownTemplate>>;

@Component({
  selector: 'plopdown-cue-renderer',
  templateUrl: './cue-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CueRendererComponent implements AfterViewInit, OnDestroy {
  private cues$: BehaviorSubject<Cue[]> = new BehaviorSubject([] as Cue[]);
  private cueComponents$: Observable<[PlopdownComponentType | null, Cue][]>;

  private subs: Subscription = new Subscription();

  @HostBinding('attr.aria-live') public ariaLive = 'assertive';

  @ViewChild('cueOutlet', { read: ViewContainerRef })
  public cueOutlet?: ViewContainerRef;

  public cueMap = new Map<
    Cue['id'],
    ComponentRef<PlopdownBaseComponent<PlopdownTemplate>>
  >();

  @Input()
  set cues(cues: Cue[] | null) {
    if (cues != null) {
      this.cues$.next(cues);
    }
  }

  @Input() files: Map<string, string> | null = null;
  @Input() videoElem: HTMLVideoElement = document.createElement('video');

  constructor(
    private cd: ChangeDetectorRef,
    private errorHandler: ErrorHandler,
    private logger: LoggerService
  ) {
    this.cueComponents$ = this.cues$.pipe(
      map((rawCues) => {
        return rawCues.map((cue) => {
          const PlopdownComponent = PLOPDOWN_TEMPLATES[cue.data.type];

          if (PlopdownComponent == null) {
            return [null, cue];
          }

          return [PlopdownComponent, cue];
        });
      })
    );
  }

  ngAfterViewInit(): void {
    const cueSub = this.cueComponents$.subscribe({
      next: (cues) => {
        // Add new cues
        cues.forEach(([cueComponent, cue]) => {
          if (cueComponent == null) {
            this.logger.error(
              `Could not find plopdown cue component matching "${cue.data.type}".`,
              cue
            );
            return;
          }

          if (this.cueMap.has(cue.id)) {
            return;
          }

          const componentRef = this.cueOutlet?.createComponent(cueComponent);

          if (componentRef == null) {
            return;
          }

          componentRef.instance.startTime = cue.startTime;
          componentRef.instance.endTime = cue.endTime;
          componentRef.instance.id = cue.id;
          componentRef.instance.data = cue.data;
          componentRef.instance.videoElem = this.videoElem;
          componentRef.instance.files = this.files;

          this.cueMap.set(cue.id, componentRef);

          componentRef.changeDetectorRef.detectChanges();
        });

        // Remove old cues
        this.cueMap.forEach((cueComponent, cueId) => {
          const foundCue = cues.find(([_, cue]) => cue.id === cueId);

          if (foundCue == null) {
            cueComponent.destroy();
            this.cueMap.delete(cueId);
          }
        });

        this.cd.detectChanges();
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });

    this.subs.add(cueSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
