## Why

From #20: an independent riffer wants the host video (Netflix, say) to get quieter while they're
talking over it. AUDIO cues today play a clip in sync with the video but leave the video's volume
alone, so commentary and dialogue compete.

## What Changes

- AUDIO cues gain an optional volume setting for the clip and an optional ducking setting for the
  host video, each as a percentage.
- Ducking fades the host video down at the cue's start and back up at its end. The fade length is
  configurable.
- When the cue ends, is skipped, or is removed, the host video returns to the volume the viewer
  had set, not to a fixed 100%.

## Capabilities

### New Capabilities

- `audio-volume-control`: volume levels for an AUDIO cue's clip, and fade-in/fade-out ducking of
  the host video while the cue plays.

### Modified Capabilities

None. There are no main specs yet, so the AUDIO cue's existing behaviour has no spec to modify.

## Impact

- `libs/plopdown-cues/src/lib/cues/audio/`: the `PlopdownAudio` model gains optional fields, and
  the component drives `volume` on both media elements. The file schema is regenerated.
- The new fields are optional, so existing tracks keep working unchanged.
- First code to write the host video's `volume`. Host players that manage their own volume state
  (Netflix, YouTube) may override or fight the change.

## Open questions

- If the viewer changes the volume mid-cue, does the fade respect their new level or override it?

Source: #20
