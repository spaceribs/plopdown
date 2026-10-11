## Why

From #29: authors have no good way to see or fix a running plopdown. Tracks are authored as files
and uploaded; to adjust a cue's timing, the author edits the file and reloads. The issue asks for
an inspector and an Audacity-style timeline editor in the browser devtools.

The groundwork half-exists. The `devtool` and `devtool-panels` apps build with the extension, but
the panel is a "Plopdown Editor — Coming Soon!" placeholder, and `devtools_page` is commented out
in `manifest.json`, so the panel never loads.

## What Changes

- Enable the devtools page so a Plopdown panel appears in Firefox's developer tools.
- **Inspect**: list the plopdowns running on the inspected page, and the video, track and cues
  each one is attached to.
- **Edit**: select a video and scrub its timeline, see cues laid out on that timeline, and adjust
  cue start/end times and content in place.
- Saved edits update the stored track.

## Capabilities

### New Capabilities

- `devtool-editor`: a Firefox devtools panel for inspecting running plopdowns and editing their
  cues on a scrubbable timeline.

### Modified Capabilities

None.

## Impact

- `apps/devtool`, `apps/devtool-panels`: the placeholder becomes the real panel.
- `apps/plopdown-ext/src/manifest.json`: `devtools_page` is re-enabled. Remember that file has
  `//` comments and isn't plain JSON.
- `libs/devtools-ref` exists to wrap the devtools APIs.
- `@plopdown/messages`: the panel needs new commands to read and edit cues in the content script.
  That means new `Command` types, plus pub and sub service methods.
- `libs/plopdown-embed` already has a `cue-timeline` component that may be reusable.
- **PR #63 (`feat/devtool`, 2021) was an earlier attempt.** It is structurally unmergeable after
  the toolchain upgrade, but worth reading for intent before designing this.
- The issue itself says "we'll definitely need to wireframe the approach". The UI needs design
  work before the spec can say much.

## Open questions

- Editor in devtools only, or also in the options page, where authors already manage tracks?
- What happens when the track being edited is synced to a remote: a local edit, or a write
  through?

Source: #29
