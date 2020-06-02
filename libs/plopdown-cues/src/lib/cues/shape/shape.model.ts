import {
  ViewportPath,
  ViewportCoordinatePairs,
  Title,
  Percentage,
  ViewBox,
  TransformOrigin,
} from './../../models/plopdown-primitives.model';
import {
  PlopdownBaseTemplate,
  PlopdownTemplateType,
} from '../../models/plopdown-base.model';
import {
  Color,
  Opacity,
  DashArray,
  DashOffset,
  Transform,
  ViewportCoordinate,
} from '../../models/plopdown-primitives.model';

interface PlopdownShapeElement {
  element: string;
  opacity?: Opacity;
  fill?: {
    color?: Color;
    opacity?: Opacity;
    rule?: 'nonzero' | 'evenodd';
  };
  stroke?: {
    color?: Color;
    opacity?: Opacity;
    width?: ViewportCoordinate;
    linecap?: 'butt' | 'square' | 'round';
    linejoin?: 'miter' | 'round' | 'bevel';
    dasharray?: DashArray;
    dashoffset?: DashOffset;
  };
  transform?: Transform;
  transformOrigin?: TransformOrigin;
}

export interface PlopdownShapeEllipse extends PlopdownShapeElement {
  element: 'ellipse';
  cx: ViewportCoordinate;
  cy: ViewportCoordinate;
  rx: ViewportCoordinate;
  ry: ViewportCoordinate;
}

export interface PlopdownShapeRect extends PlopdownShapeElement {
  element: 'rect';
  x: ViewportCoordinate;
  y: ViewportCoordinate;
  width: ViewportCoordinate;
  height: ViewportCoordinate;
  rx?: ViewportCoordinate;
  ry?: ViewportCoordinate;
}

export interface PlopdownShapePath extends PlopdownShapeElement {
  element: 'path';
  d: ViewportPath;
}

export interface PlopdownShapePolygon extends PlopdownShapeElement {
  element: 'polygon';
  points: ViewportCoordinatePairs;
}

export interface PlopdownShapePolyline extends PlopdownShapeElement {
  element: 'polyline';
  points: ViewportCoordinatePairs;
}

type PlopdownShapeElements =
  | PlopdownShapeEllipse
  | PlopdownShapeRect
  | PlopdownShapePath
  | PlopdownShapePolygon
  | PlopdownShapePolyline;

export interface PlopdownShape extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Shape;
  title: {
    text: Title;
    show: boolean;
  };
  top: Percentage;
  left: Percentage;
  width: Percentage;
  height: Percentage;
  viewBox: ViewBox;
  elements: PlopdownShapeElements[];
  blend?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
}
