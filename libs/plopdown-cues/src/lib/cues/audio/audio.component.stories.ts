import { PlopdownAudio } from './audio.model';
import { LoggerModule } from '@plopdown/logger';
import { IconModule } from '@plopdown/icon';

import { AudioComponent } from './audio.component';
import { object } from '@storybook/addon-knobs';
import { PlopdownTemplateType } from '../../models/plopdown-base.model';

export default {
  title: 'AudioComponent',
};

const mockAudioData: PlopdownAudio = {
  type: PlopdownTemplateType.Audio,
  top: 20,
  left: 20,
  title: 'Test',
  url: 'test.mp3',
};
const mockVideoElem = document.createElement('video');

export const primary = () => ({
  moduleMetadata: {
    imports: [
      IconModule,
      LoggerModule.forRoot({
        appName: 'Mock',
        color: 'red',
        providers: [],
      }),
    ],
  },
  component: AudioComponent,
  props: {
    data: object<PlopdownAudio>('data', mockAudioData),
  },
});
