import { addParameters } from '@storybook/angular';

addParameters({
  backgrounds: [
    { name: 'White', value: '#FFF' },
    { name: 'Light Gray', value: '#DDD' },
    { name: 'Medium Gray', value: '#888', default: true },
    { name: 'Dark Gray', value: '#333' },
    { name: 'Black', value: '#000' },
  ],
  viewport: {
    viewports: {
      standard: {
        name: '4:3 TV Standard',
        styles: {
          width: '640px',
          height: '480px',
        },
      },
      hd: {
        name: '16:9 HD Standard',
        styles: {
          width: '853px',
          height: '480px',
        },
      },
      widescreen: {
        name: '21:9 Widescreen',
        styles: {
          width: '1120px',
          height: '480px',
        },
      },
    },
    defaultViewport: 'standard',
  },
});
