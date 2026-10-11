## Why

From #28: a cue can cover exactly the part of the video a viewer wants to see. Today the only way
out is the in-page menu's "Remove Plopdown", which removes the whole overlay. There's no way to
move one cue aside or hide cues for a while.

## What Changes

- Each rendered cue gets a control to hide it for the rest of the current playback.
- The Plopdown menu gets a "Hide all cues" toggle that hides cues until the viewer turns them back
  on.
- Viewers can drag cues to temporarily reposition all of them.
- Keyboard shortcuts to hide the current cue and to toggle all cues.
- All of this is viewer-side and temporary. It changes nothing in the track itself.

## Capabilities

### New Capabilities

- `cue-visibility-controls`: viewer-side controls to hide one cue, hide all cues, or move cues out
  of the way, by pointer and by keyboard.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-embed`: the embed menu (`embed-menu.component`) gains a hide-all toggle; today it
  offers only Select Track and Remove Plopdown.
- `libs/plopdown-cues`: the cue renderer needs per-cue hidden state and a drag offset.
- Keyboard shortcuts in a content script can collide with the host page's own (YouTube uses most
  single keys). That needs a design decision.
- Per-cue controls and drag handles must not swallow clicks meant for the video underneath.

## Open questions

- "For the duration of the current playback": should a hidden cue reappear after a seek back past
  it, or stay hidden until the page reloads?
- Should the drag offset persist between videos, or reset each time?

Source: #28
