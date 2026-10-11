## Why

From #21: a video artist wants cues to match the tone of the video, but every cue looks the same:
colours and typography are fixed in each component's stylesheet. Two layout constraints get in the
way too: a PLOP cue must declare icons, and its icon sits in a fixed position.

## What Changes

- Cues can be re-themed: an author can set colour, background and typography, for a whole track or
  for a single cue.
- PLOP cues can omit icons. `icons` becomes optional in the schema; the template already renders
  correctly when the list is empty.
- PLOP cues can place their icon on the right of the annotation instead of the left.

## Capabilities

### New Capabilities

- `cue-theming`: author-controlled visual styling of cues at track and cue level, and a more
  flexible PLOP icon layout.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: the PLOP model (`icons` optional, an icon placement option) and the
  stylesheets of every cue component, which need to read theme values rather than fixed ones.
- `libs/plopdown-file`: the schema is regenerated. A track-level theme may need a new header in
  `PlopdownFileHeaders`.
- `Cue` already has an untyped `style?: Record<string, unknown>` field. It's only applied in the
  embed's cue _timeline_, not to the rendered cue, so it doesn't do this job today. The design
  needs to decide whether to adopt it or replace it.
- Making `icons` optional is backward compatible. Files that leave it out will still fail
  validation in older versions of the extension.

## Open questions

- Free-form CSS, or a fixed set of theme tokens? Free-form CSS from a shared file is injected into
  arbitrary host pages, which is a security concern. Tokens are safer.
- Each icon already has its own `top`/`left`. Does "icon on the right" need a new option, or is it
  a layout default within the card?

Source: #21
