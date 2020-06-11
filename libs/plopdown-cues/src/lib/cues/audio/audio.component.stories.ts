import { PlopdownAudio } from './audio.model';
import { LoggerModule } from '@plopdown/logger';
import { IconModule } from '@plopdown/icon';

import { AudioComponent } from './audio.component';
import { VIDEO_ELEM_TOKEN, TRACK_FILES_TOKEN } from '@plopdown/tokens';
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
const mockVideoFiles = new Map();

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
    providers: [
      { provide: VIDEO_ELEM_TOKEN, useValue: mockVideoElem },
      { provide: TRACK_FILES_TOKEN, useValue: mockVideoFiles },
    ],
  },
  component: AudioComponent,
  props: {
    data: object<PlopdownAudio>('data', mockAudioData),
  },
});
