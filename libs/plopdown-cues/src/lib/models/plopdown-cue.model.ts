import { PlopdownTemplate } from './plopdown-templates.model';

export interface Cue {
  /**
   * The start time of the cue in seconds
   * 
   * @title Cue Start
   */
  startTime: number;


  /**
   * The end time of the cue in seconds
   * 
   * @title Cue End
   */
  endTime: number;

  /**
   * The unique identifier of the cue
   * 
   * @title Cue ID
   */
  id: string;

  /**
   * The type specific cue data
   * 
   * @type object
   * @title Cue Data
   */
  data: PlopdownTemplate;

  /**
   * Name of the layer this cue is on
   * 
   * @title Layer
   */
  layer?: string;

  /**
   * Special styles to apply
   * 
   * @title Cue Styles
   */
  style?: Record<string, unknown>;
}
