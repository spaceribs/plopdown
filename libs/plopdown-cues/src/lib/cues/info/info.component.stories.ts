import { PlopdownInfo } from './info.model';
import { InfoComponent } from './info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { PlopdownTemplateType } from '../../models/plopdown-base.model';

export default {
  title: 'InfoComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: InfoComponent,
  props: {
    data: object<PlopdownInfo>('data', {
      type: PlopdownTemplateType.Info,
      title: 'This is a title',
      authors: ['John Smith', 'Jane Doe'],
      url: 'https://google.com',
    }),
  },
});
