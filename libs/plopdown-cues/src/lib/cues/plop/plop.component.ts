import { PlopdownPlop } from './plop.model';
import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  AfterViewInit,
  ChangeDetectorRef
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
          params: { timing: 0.2 }
        })
      ),
      transition(
        '* => void',
        useAnimation(zoomOut, {
          params: { timing: 0.2 }
        })
      )
    ])
  ]
})
export class PlopComponent extends PlopdownBaseComponent<PlopdownPlop>
  implements AfterViewInit {
  public editing = false;
  public sanitizedDesc = '';
  @HostBinding('@plopIn') public animate: boolean;
  @HostBinding('style.top.%') top: number;
  @HostBinding('style.left.%') left: number;
  @HostBinding('style.width.%') width: number;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.top = this.data.top;
    this.left = this.data.left;
    this.width = this.data.width;

    this.cd.detectChanges();
  }
}
