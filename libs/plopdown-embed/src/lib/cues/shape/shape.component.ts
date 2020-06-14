import { fadeIn, fadeOut } from 'ng-animate';
import {
  trigger,
  transition,
  sequence,
  useAnimation,
} from '@angular/animations';
import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { PlopdownBaseComponent } from '../../models/plopdown-base.component';
import { PlopdownShape } from './shape.model';

@Component({
  selector: 'plopdown-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('infoFade', [
      transition(
        'void => *',
        sequence([
          useAnimation(fadeIn, {
            params: { timing: 0.4 },
          }),
        ])
      ),
      transition(
        '* => void',
        sequence([
          useAnimation(fadeOut, {
            params: { timing: 0.4 },
          }),
        ])
      ),
    ]),
  ],
})
export class ShapeComponent extends PlopdownBaseComponent<PlopdownShape> {
  public color = '#79addc';

  @HostBinding('@infoFade') animate;

  textPreview(data = this.data): string {
    return `${data.title.text}`;
  }
}
