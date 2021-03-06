import { PlopdownPlop } from './plop.model';
import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  OnChanges,
} from '@angular/core';
import { PlopdownBaseComponent } from '../../models/plopdown-base.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rubberBand, zoomOut } from 'ng-animate';

@Component({
  selector: 'plopdown-plop',
  templateUrl: './plop.component.html',
  styleUrls: ['./plop.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('plopIn', [
      transition(
        'void => *',
        useAnimation(rubberBand, {
          params: { timing: 0.2 },
        })
      ),
      transition(
        '* => void',
        useAnimation(zoomOut, {
          params: { timing: 0.2 },
        })
      ),
    ]),
  ],
})
export class PlopComponent
  extends PlopdownBaseComponent<PlopdownPlop>
  implements OnChanges, AfterViewInit {
  public color = '#b2e7c1';
  @HostBinding('@plopIn') public animate = true;
  @HostBinding('style.top.%') top = 0;
  @HostBinding('style.left.%') left = 0;
  @HostBinding('style.width.%') width = 0;

  @HostListener('click', ['$event'])
  preventBubbling(event: Event) {
    event.stopPropagation();
  }

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(): void {
    if (this.data != null) {
      this.top = this.data.top;
      this.left = this.data.left;
      this.width = this.data.width;
    }
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.top = this.data.top;
      this.left = this.data.left;
      this.width = this.data.width;

      this.cd.detectChanges();
    }
  }

  textPreview(data = this.data): string {
    let emojis = '';

    if (data?.icons) {
      emojis = data?.icons.reduce((memo, icon) => {
        memo += icon.emoji.trim();
        return memo;
      }, '');
    }

    if (emojis.length) {
      emojis = `${emojis} `;
    }

    return `${emojis}${data?.desc}`;
  }
}
