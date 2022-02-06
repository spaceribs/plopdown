import {
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';

export const CueTemplates: Record<PlopdownTemplateType, PlopdownTemplate> = {
  [PlopdownTemplateType.Info]: {
    type: PlopdownTemplateType.Info,
    title: 'Untitled Info',
    authors: ['Anonymous'],
  },
  [PlopdownTemplateType.Audio]: {
    type: PlopdownTemplateType.Audio,
    title: 'Untitled Audio',
    top: 20,
    left: 20,
    url: '',
  },
  [PlopdownTemplateType.Plop]: {
    type: PlopdownTemplateType.Plop,
    top: 20,
    left: 20,
    width: 80,
    desc: 'Annotation Needed',
    icons: [
      {
        top: 70,
        left: 50,
        size: 200,
        rotate: 0,
        emoji: '❔',
      },
    ],
  },
  [PlopdownTemplateType.Shape]: {
    type: PlopdownTemplateType.Shape,
    title: {
      text: 'Untitled Shape',
      show: false,
    },
    viewBox: '0 0 40 40',
    top: 20,
    left: 20,
    width: 60,
    height: 60,
    elements: [
      {
        element: 'ellipse',
        cx: 20,
        cy: 20,
        rx: 20,
        ry: 20,
      },
    ],
  },
};
