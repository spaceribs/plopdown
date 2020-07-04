import { configure, addDecorator, addParameters } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';
import '../../../.storybook/preview';

addDecorator(withKnobs);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

configure(
  require.context('../src/lib', true, /\.(stories|story)\.(js|ts|mdx)$/),
  module
);
