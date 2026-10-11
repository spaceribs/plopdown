## Why

From #26: a video author wants to make interactive fiction, where the viewer chooses what happens
next. Plopdown cues today are fixed overlays on a linear timeline; nothing lets the viewer take the
video somewhere else.

## What Changes

- New `ADVENTURE` cue type. At its `startTime` the host video pauses and the cue shows a prompt
  with two or more options.
- Each option names a target timestamp. Choosing it seeks the video there and resumes playback.
- The prompt stays until the viewer chooses. There is no timeout unless the author sets a default
  option.

## Capabilities

### New Capabilities

- `adventure-cues`: a cue that pauses the video and offers choices, each jumping to a different
  timestamp.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/adventure/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- Depends on `add-pause-cues` for pausing and resuming the host video.
- Branching means a track is no longer read top to bottom. Authors need a way to see which ranges
  are reachable from which choices; that tooling belongs to `add-devtool-editor`.

## Open questions

- After a jump, should cues the viewer skipped over be treated as seen?
- Should a branch be able to end the video, rather than only jump within it?

Source: #26
