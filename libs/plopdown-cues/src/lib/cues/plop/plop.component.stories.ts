import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlopComponent } from './plop.component';
import { object } from '@storybook/addon-knobs';
import { PlopdownPlop } from './plop.model';
import { PlopdownTemplateType } from '../../models/plopdown-base.model';

export default {
  title: 'PlopComponent',
};

export const IconLeft = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: PlopComponent,
  props: {
    data: object<PlopdownPlop>('data', {
      type: PlopdownTemplateType.Plop,
      top: 20,
      left: 20,
      width: 40,
      desc: 'This is a plopdown example',
      icons: [
        {
          top: 30,
          left: 30,
          size: 150,
          rotate: 0,
          emoji: '🌖',
        },
        {
          top: 70,
          left: 50,
          size: 170,
          rotate: 0,
          emoji: '👩‍🚀',
        },
      ],
    }),
  },
});
