## Why

From #25: a viewer wants to keep count of how often something happens on screen, the classic
drinking-game "every time they say X". Every cue today is independent. None carries state from one
cue to the next, so there is nothing to count with.

## What Changes

- New `COUNTER` cue type. Each counter cue belongs to a named group and increments that group's
  count when it fires.
- Each group has a label (the action it's tracking) and shows its running total over the video.
- An optional sound effect plays on each increment.
- Counts are derived from playback position: seeking backwards gives the count as it stood at that
  point, so the total can't drift from what was actually watched.

## Capabilities

### New Capabilities

- `counter-cues`: cues that increment a labelled, named counter shown over the video, with an
  optional sound on each increment.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/counter/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- Introduces state shared across cues within a track. The renderer currently treats each cue in
  isolation, so this is the first cross-cue concept and the main design question.
- Sound playback reuses the media handling the AUDIO cue already has.

## Open questions

- Where are group labels defined: on each cue, or once per track in the file headers?
- Should the total stay on screen between increments, or only appear when a cue fires?

Source: #25
