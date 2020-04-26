export enum PlopdownTemplateType {
  Info = 'INFO',
  Plop = 'PLOP',
  Audio = 'AUDIO'
}

export interface PlopdownBaseTemplate {
  type: PlopdownTemplateType;
}
