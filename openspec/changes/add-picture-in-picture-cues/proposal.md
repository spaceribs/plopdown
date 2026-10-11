## Why

From #27: a reaction creator wants viewers to see their reaction alongside the original video,
synced to it, instead of re-uploading the original inside a reaction video, which risks a
copyright strike. Plopdown can already sync an audio clip to the host video (AUDIO cue); this
extends that to video.

## What Changes

- New `PIP` cue type that plays a second video in a picture-in-picture box over the host video.
- Sources: a plain video file (mp4), and YouTube and Vimeo embeds.
- The PIP stays in sync with the host video the way AUDIO cues do: pausing, volume and skipping
  carry over.
- "Takeover": the viewer can enlarge the PIP to fill the frame and shrink it back.

## Capabilities

### New Capabilities

- `picture-in-picture-cues`: a synced secondary video, from a file or a YouTube/Vimeo embed,
  shown over the host video, with an enlarge-to-fill takeover.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/pip/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- The mp4 path can reuse `SyncMediaService`, which already syncs AUDIO cues.
- **YouTube and Vimeo embeds are a different problem.** They're cross-origin iframes, so they can't
  be read or synced through `HTMLMediaElement`, and each needs its own player API.
- Embedding an iframe inside a host page may be blocked by that page's content security policy.
- May need to share a volume model with `add-volume-ducking-cues`.

## Open questions

- Ship mp4 first and the embeds after? The embeds carry most of the risk.

Source: #27
