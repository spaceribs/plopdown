import { LayerElement } from '../element/element.models';

export interface Layer {
  title?: string;
  readonly: boolean;
  elements: LayerElement[];
}
