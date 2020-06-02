import { PlopdownShape } from './shape.model';
import { ShapeComponent } from './shape.component';
import { object } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlopdownTemplateType } from '../../models/plopdown-base.model';

import exampleImage from '../../../assets/example.png';

console.log(exampleImage);

export default {
  title: 'ShapeComponent',
};

const BasicViewport: PlopdownShape = {
  type: PlopdownTemplateType.Shape,
  title: {
    text: 'Rectangle',
    show: false,
  },
  top: 20,
  left: 20,
  width: 60,
  height: 60,
  viewBox: '0 0 640 480',
  elements: [],
};

export const Rectangles = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: ShapeComponent,
  assets: [exampleImage],
  props: {
    data: object<PlopdownShape>('data', {
      ...BasicViewport,
      elements: [
        { element: 'rect', x: 0, y: 0, width: 240, height: 240 },
        {
          element: 'rect',
          x: 320,
          y: 50,
          width: 240,
          height: 240,
          rx: 10,
          ry: 10,
          opacity: 0.5,
          fill: {
            color: '#0F0',
            opacity: 0.2,
          },
          stroke: {
            color: '#F00',
            opacity: 0.9,
            width: 1,
            dasharray: '10 20',
            dashoffset: 1000,
          },
          transform: 'rotate(25deg)',
          transformOrigin: 'center',
        },
      ],
    }),
  },
});

export const Ellipses = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: ShapeComponent,
  props: {
    data: object<PlopdownShape>('data', {
      ...BasicViewport,
      elements: [
        { element: 'ellipse', cx: 120, cy: 120, rx: 120, ry: 120 },
        {
          element: 'ellipse',
          cx: 360,
          cy: 140,
          rx: 120,
          ry: 120,
          opacity: 0.5,
          fill: {
            color: '#0FF',
            opacity: 0.2,
          },
          stroke: {
            color: '#F00',
            opacity: 0.9,
            width: 1,
            dasharray: '10 20',
            dashoffset: 1000,
          },
          transform: 'skew(-25deg)',
          transformOrigin: 'center',
        },
      ],
    }),
  },
});

export const Paths = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: ShapeComponent,
  props: {
    data: object<PlopdownShape>('data', {
      ...BasicViewport,
      elements: [
        {
          element: 'path',
          d: 'M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
        },
        {
          element: 'path',
          d: 'M 110 180 C 140 110, 165 110, 195 180 S 250 250, 280 180',
          opacity: 0.5,
          fill: {
            color: '#0FF',
            opacity: 0.2,
          },
          stroke: {
            color: '#F00',
            opacity: 0.9,
            width: 1,
            dasharray: '10 20',
            dashoffset: 1000,
          },
          transform: 'scale(2)',
          transformOrigin: 'left',
        },
      ],
    }),
  },
});

export const Polygons = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: ShapeComponent,
  props: {
    data: object<PlopdownShape>('data', {
      ...BasicViewport,
      elements: [
        {
          element: 'polygon',
          points: '0,100 50,25 50,75 100,0',
        },
        {
          element: 'polygon',
          points: '100,200 150,125 150,175 200,100',
          opacity: 0.5,
          fill: {
            color: '#0FF',
            opacity: 0.2,
          },
          stroke: {
            color: '#F00',
            opacity: 0.9,
            width: 1,
            dasharray: '10 20',
            dashoffset: 1000,
          },
          transform: 'scale(2)',
          transformOrigin: 'left top',
        },
      ],
    }),
  },
});

export const Polylines = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule],
  },
  component: ShapeComponent,
  props: {
    data: object<PlopdownShape>('data', {
      ...BasicViewport,
      elements: [
        {
          element: 'polyline',
          points: '0,100 50,25 50,75 100,0',
        },
        {
          element: 'polyline',
          points: '100,200 150,125 150,175 200,100',
          opacity: 0.5,
          fill: {
            color: '#0FF',
            opacity: 0.2,
          },
          stroke: {
            color: '#F00',
            opacity: 0.9,
            width: 1,
            dasharray: '10 20',
            dashoffset: 1000,
          },
          transform: 'scale(2)',
          transformOrigin: 'left top',
        },
      ],
    }),
  },
});
