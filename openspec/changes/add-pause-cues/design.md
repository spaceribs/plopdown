## Context

See `proposal.md` for motivation and `specs/pause-cues/spec.md` for the required behaviour.

How cues reach the screen today shapes everything below:

- `PlopdownEmbedComponent` turns a track into a browser `metadata` TextTrack of `VTTCue`s, and
  listens for `cuechange` to read `track.activeCues`.
- `CueRendererComponent` receives that active list, creates a component for each cue that has just
  become active, and destroys the components of cues that have left it. **A cue component's
  lifetime is exactly the time its cue is active.**
- The browser updates `activeCues` on its "time marches on" cadence, roughly with `timeupdate`.
  That runs every 15–250 ms, so a cue is detected a little _after_ its `startTime`, never on the
  exact frame.
- `CueTimelineComponent` (in `plopdown-embed`) also instantiates every cue's component, purely to
  read `color` and `textPreview()`. It never runs change detection on them and never destroys them.
  So **a cue component's constructor must have no side effects.**
- The AUDIO cue mirrors the host video's `pause` and `play` events onto its own clip.

## Goals / Non-Goals

**Goals:**

- A pause that lands on the author's exact frame, despite the browser's coarse cue timing.
- Behaviour that comes from the cue component's lifecycle, so re-arming after a seek needs no
  extra bookkeeping.
- Shared groundwork that adventure and slow-motion cues can reuse to control the host video.

**Non-Goals:**

- Frame-accurate stepping. Browsers expose neither frame rate nor frame boundaries.
- A text label on the pause itself. Authors put PLOP, INFO or SHAPE cues in the same time range;
  the pause stays a single-purpose control.
- Authoring UI. Pause cues are written into Plopdown files like every other cue type today.
- Remembering across a page reload that a pause already fired.

## Decisions

### 1. Data model: `{ type: 'PAUSE', duration?: Seconds }`

`duration` is optional real-world seconds; absent means hold until resumed. It can't be media time,
because media time stops while paused.

The cue's own `endTime` keeps its normal meaning, the end of the cue's active range. It must be
later than `startTime`, or the browser deactivates the cue at once and the component is destroyed
before it can hold anything.

_Alternative considered:_ using `endTime - startTime` as the hold duration. Rejected, because that
range is media time, which doesn't advance during the pause, and it would leave no way to express
"hold until resumed".

_Alternative considered:_ `top`/`left` fields to position the resume control, like PLOP and SHAPE.
Rejected for now: the control is chrome rather than content, so it sits in a fixed bottom-centre
spot. `add-cue-theming` is the place to make cue presentation configurable.

### 2. Trigger: pause, then snap back to `startTime`

In `ngOnInit`, the component fires only when all of these hold:

- the video is playing (`!paused`);
- it isn't in the middle of a seek (`!seeking`);
- `currentTime - startTime` is no more than 1 s.

Firing calls `pause()` and then sets `currentTime = startTime`. Snapping back is what makes the
pause land on the author's frame, given that cue detection runs up to a quarter-second late.

The 1 s window separates "playback reached the cue" from "the viewer seeked into the middle of it".
A seek landing in that window while playing counts as reaching the cue, which is the right outcome.

_Alternative considered:_ the spec-defined `VTTCue.pauseOnExit`. Rejected: it pauses on _exit_
rather than entry, at the same coarse cadence, and it would mean the embed creating cues differently
per type.

_Alternative considered:_ watching `timeupdate` for the crossing. Rejected as no more precise than
`cuechange`, and it would duplicate scheduling the browser already does.

### 3. Lifecycle owns arming and teardown

All behaviour starts in `ngOnInit` and is torn down in `ngOnDestroy`. That follows the codebase's
`subs = new Subscription()` idiom, and it gives the spec's lifecycle rules for free:

- **Once per pass:** the component exists for one continuous stay inside the range, and fires at
  most once while it exists.
- **Re-arm on seeking back:** leaving the range destroys the component; re-entering creates a fresh
  one.
- **Leaving ends the hold:** `ngOnDestroy` cancels the timer and removes the key listener, and does
  _not_ call `play()`.
- **Previews don't pause:** the timeline never runs `ngOnInit` on its instances, and the
  constructor does nothing.

### 4. Ending the hold

A hold ends, removing the control, cancelling the timer and removing the key listener, on any of:

- the resume control, which calls `play()`;
- the timer elapsing, which calls `play()`;
- a `play` event on the host video from any source, including the host player's own button;
- component destruction.

Listening for `play` is what makes the host player's own controls work as "resume". The timed
resume is an RxJS `timer`, cancelled through the subscription. The control's click handler calls
`stopPropagation()`, so the host page doesn't also see a click on the video.

### 5. Keyboard stepping

While a hold is active, a `keydown` listener in the capture phase on `document` handles `,`
(−1/30 s) and `.` (+1/30 s). It calls `preventDefault()` and `stopPropagation()`, so a host player
with the same shortcuts (YouTube) doesn't step twice.

It ignores events from `input`, `textarea` or `contenteditable` targets, and events with
Ctrl/Alt/Meta held. The listener exists only during a hold, so outside one Plopdown never touches
the keyboard. The first step cancels the timed resume: a viewer stepping through frames is studying
the moment and shouldn't be interrupted.

`,` and `.` follow YouTube's convention, so many viewers already know them. 1/30 s is a common
frame rate and close enough at 24, 25 and 60 fps to read as "one frame". Both are easy to change
later without affecting the rest of the design.

### 6. Schema and registration

The new model goes in `cues/pause/pause.model.ts`. `PlopdownTemplateType.Pause = 'PAUSE'` joins
the `PlopdownTemplate` union, and the component is registered in `PLOPDOWN_TEMPLATES` and
`PlopdownCuesModule`. The file schema is regenerated with `nx run plopdown-file:generate-schema`,
never edited by hand. `duration` reuses the `Seconds` primitive, whose `@minimum 0` gives the
spec's rejection of negative durations for free.

## Risks / Trade-offs

- [The host player fights back, e.g. it resumes playback itself or ignores `pause()`] → A `play`
  event simply ends the hold, as if the viewer resumed. The cue degrades to doing nothing; it never
  fights the host in a loop.
- [Snapping back to `startTime` shows a brief visible jump on slow devices] → The jump is at most
  about 250 ms of video, and it is what makes the pause land on the authored frame. Accepted.
- [Capturing `,` and `.` collides with a host page's own shortcuts] → Only while a Plopdown pause is
  held, never while typing, never with modifiers held.
- [Files with a PAUSE cue fail validation in older versions of the extension] → Inherent in adding
  a cue type. Worth noting in the release that introduces it.
- [jsdom doesn't implement `HTMLMediaElement.play()`/`pause()`] → Specs stub both on the test video
  element.

## Migration Plan

Additive. Existing files and cue types are untouched. The schema change makes new files with PAUSE
cues valid and changes nothing for existing ones. Rollback is removing the cue type and
regenerating the schema.
