export enum PlopdownTemplateType {
  Info = 'INFO',
  Plop = 'PLOP',
  Audio = 'AUDIO',
  Shape = 'SHAPE',
}

export interface PlopdownBaseTemplate {
  type: PlopdownTemplateType;
}
