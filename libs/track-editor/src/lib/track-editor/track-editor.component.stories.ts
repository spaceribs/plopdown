import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TrackEditorComponent } from './track-editor.component';

export default {
  title: 'TrackEditorComponent',
  component: TrackEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TrackEditorComponent>;

const Template: Story<TrackEditorComponent> = (args: TrackEditorComponent) => ({
  component: TrackEditorComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
