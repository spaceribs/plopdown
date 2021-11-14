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
    time: new Date(30000),
    endTime: new Date(60000),
    zoom: 10,
  },
  argTypes: {
    timeChange: { action: 'timeChange' },
    zoomChange: { action: 'zoomChange' },
  },
} as Meta<TrackEditorComponent>;

const Template: Story<TrackEditorComponent> = (args: TrackEditorComponent) => ({
  component: TrackEditorComponent,
  props: args,
});

export const Primary = Template.bind({});

Primary.args = {};
