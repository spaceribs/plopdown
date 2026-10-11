## Why

From #24: a movie-trivia fan wants to show where a scene was filmed. Plopdown can describe a scene
in text (INFO, PLOP), but it has no notion of location and no way to show one.

## What Changes

- New `MAP` cue type showing a minimap of a location over the video.
- A cue can carry several waypoints. The map eases between them over the cue's duration.
- Each waypoint can carry a heading, so the map shows which way the camera or actor faces.
- Evaluate the WebVMT spec (https://webvmt.org/), a WebVTT-based format for map tracks. Plopdown
  files are WebVTT-based too, so aligning with it may be cheap.

## Capabilities

### New Capabilities

- `map-cues`: a minimap cue that shows a location, eases between waypoints, and indicates heading.

### Modified Capabilities

None.

## Impact

- `libs/plopdown-cues`: a new `cues/map/` model and component, a new template type, and
  registration in `PLOPDOWN_TEMPLATES`. The file schema is regenerated.
- **Needs an external map tile provider.** That means a new runtime dependency, a network request
  from the content script on every page with a map cue, possibly an API key, and possibly a cost.
  The issue itself asks for "the least amount of money".
- The content script runs inside arbitrary host pages, so loading tiles has to work under those
  pages' content security policies. It may need to go through the background page.
- A tile provider would see which locations are viewed. That is a privacy consideration for
  viewers, and needs stating somewhere.

## Open questions

- Which tile provider? OpenStreetMap tiles carry usage limits for heavy use; commercial providers
  need keys and billing. This decides cost, and whether this is feasible at all.
- Adopt WebVMT, or only borrow from it?

Source: #24
