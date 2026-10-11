## Why

From #30: a video riffer wants to put words in a character's mouth, or thoughts in their head.
Today's cues can draw an annotation card (PLOP) or an outline (SHAPE), but neither looks like a
comic-style bubble pointing at the person speaking.

## What Changes

- New `BUBBLE` cue type with two styles: speech (a solid tail) and thought (a trail of shrinking
  circles).
- The bubble has a body position and size, plus a separate focus point that the tail or trail runs
  to, so it can point at a character wherever they are in the frame.
- Text sits inside the bubble and wraps to the bubble's width.

## Capabilities

### New Capabilities

- `speech-bubble-cues`: speech and thought bubbles positioned over the video, with a tail or trail
  aimed at a separate focus point.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/bubble/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- Positions use the existing `Percentage` primitive, so bubbles scale with the video the way PLOP
  and SHAPE cues do.
- Tail geometry likely reuses SHAPE's SVG approach rather than adding a drawing dependency.

## Open questions

- Should the focus point be able to move over the cue's duration, to follow a character who walks
  across the frame? That is a much larger feature than a static point.

Source: #30
