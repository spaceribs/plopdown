## Why

From #31: a sports fan wants to slow the action down to pick it apart, and to watch an instant
replay of a key moment. Nothing in Plopdown changes playback speed today — no code writes the host
video's `playbackRate`.

## What Changes

- New `SLOW_MOTION` cue type. Between `startTime` and `endTime` the host video plays at a speed the
  author sets, then returns to whatever rate the viewer had before.
- Optional instant replay: reaching `endTime` rewinds to `startTime` and replays the range at the
  configured speed. The author sets how many replays happen before playback carries on.
- The viewer can skip the slowdown or the replay.

## Capabilities

### New Capabilities

- `slow-motion-cues`: a cue that changes the host video's playback rate over its time range, with
  an optional instant replay of that range.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/slow-motion/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- Writes `playbackRate` and `currentTime` on the host video. Restoring the viewer's own rate
  afterwards matters, since they may already be watching at 1.5x.
- A replay is a rewind into the cue's own range, so every other cue in that range fires again.
  That has to be defined, not discovered.
- Builds on the host-video control groundwork in `add-pause-cues`.

## Open questions

- Should cues that overlap the replayed range re-fire on each replay, or be suppressed?
- Browsers clamp `playbackRate` (Firefox mutes audio below 0.25x). What range should the schema
  allow?

Source: #31
