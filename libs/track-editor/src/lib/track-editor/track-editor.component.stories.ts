import { PlopdownTemplateType } from '@plopdown/plopdown-cues';
import { TrackEditorModule } from '../track-editor.module';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TrackEditorComponent } from './track-editor.component';

export default {
  title: 'TrackEditorComponent',
  component: TrackEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [TrackEditorModule],
    }),
  ],
  args: {
    zoom: 10,
    endTime: 60000,
    currentTime: 30000,
    layers: [
      {
        id: 'Video',
        readonly: true,
      },
      {
        id: 'Layer 1',
        readonly: false,
      },
      {
        id: 'Layer 2',
        readonly: false,
      },
    ],
    plopdownFile: {
      headers: {
        type: 'plopdown_v2',
        title: 'Test',
        for: 'test',
        created: '2020-10-08T11:47:46.376Z',
        updated: '2020-10-08T11:47:46.376Z',
        thumbnail: 'something.png',
        url: 'test.com',
        language: 'en-us',
        license: 'MIT',
        authors: 'spaceribs',
        frameOrigin: undefined,
        framePath: undefined,
        frameSearch: undefined,
        frameTitle: undefined,
        xpath: '/HTML[1]/BODY[1]//VIDEO[1]',
        duration: '123',
        _id: 'caea223e-ff63-4edb-a292-d92d4a262c6f',
        _rev: '27895983-58cb-4b97-8888-37bf22401463',
      },
      cues: [
        {
          startTime: 2000,
          endTime: 4000,
          data: {
            top: 0,
            left: 0,
            width: 20,
            desc: 'text',
            icons: [],
            type: PlopdownTemplateType.Plop,
          },
          layer: 'Layer 1',
          id: 'test1',
        },
        {
          startTime: 5000,
          endTime: 7000,
          data: {
            top: 0,
            left: 0,
            title: 'test',
            url: 'test',
            type: PlopdownTemplateType.Audio,
          },
          layer: 'Layer 1',
          id: 'test2',
        },
        {
          startTime: 3000,
          endTime: 7000,
          data: {
            title: {
              text: 'test',
              show: true,
            },
            top: 0,
            left: 0,
            width: 10,
            height: 10,
            viewBox: '0 0 10 10',
            elements: [],
            type: PlopdownTemplateType.Shape,
          },
          layer: 'Layer 2',
          id: 'test3',
        },
      ],
    },
  },
  argTypes: {
    timeChange: { action: 'timeChange' },
    zoomChange: { action: 'zoomChange' },
    plopdownFileChange: { action: 'plopdownFileChange' },
    cueSelectedChange: { action: 'cueSelectedChange' },
    layersChange: { action: 'layersChange' },
  },
} as Meta<TrackEditorComponent>;

const Template: Story<TrackEditorComponent> = (args: TrackEditorComponent) => ({
  component: TrackEditorComponent,
  props: args,
});

export const Primary = Template.bind({});

Primary.args = {};
