## Why

From #19: a martial-arts curator wants to stop the video at a chosen moment to point out a
technique or a mistake. No cue today can pause the host video on its own — the AUDIO cue pauses
and resumes it, but only to keep its own clip in sync. Pausing is also the primitive that
adventure cues (#26) and slow-motion replays (#31) depend on.

## What Changes

- New `PAUSE` cue type. When playback reaches the cue's `startTime`, the host video pauses.
- The pause either lasts a set duration and then resumes on its own, or holds until the viewer
  resumes.
- While paused, the cue shows a "Skip Pause" / "Unpause" control.
- While paused, the viewer can step frame by frame with the keyboard.
- A pause fires once per pass through its `startTime`: resuming must not immediately retrigger it,
  and seeking back before it re-arms it.

## Capabilities

### New Capabilities

- `pause-cues`: a cue that pauses the host video at its start time, for a fixed duration or until
  the viewer resumes, with a resume control and keyboard frame stepping while paused.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/pause/` model and component, a `PlopdownTemplateType.Pause`
  value, and registration in `PLOPDOWN_TEMPLATES`.
- `libs/plopdown-file`: the cue union grows, so the file schema is regenerated with
  `nx run plopdown-file:generate-schema`. The generated `.json`/`.js` are never hand-edited.
- First cue to pause the host video on its own schedule. The AUDIO cue already calls `pause()` and
  `play()` on it, but only to mirror its clip. Pages whose players fight back against external
  control are the main risk.
- Keyboard frame stepping needs listeners that don't hijack the host page's own shortcuts.
- Shared groundwork for `add-adventure-cues` and `add-slow-motion-cues`.

## Open questions

- Frame stepping: the web has no frame-accurate seek, and frame rate isn't exposed. Is a fixed
  step (e.g. 1/30 s) acceptable?
- Which keys? `,` and `.` match YouTube's convention but may collide with the host page.

Source: #19
