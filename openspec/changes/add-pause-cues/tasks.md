## 1. Model and schema

- [ ] 1.1 Add `PlopdownTemplateType.Pause = 'PAUSE'` in `plopdown-base.model.ts`
- [ ] 1.2 Add `cues/pause/pause.model.ts` with `PlopdownPause { type: PlopdownTemplateType.Pause; duration?: Seconds }`
- [ ] 1.3 Add `PlopdownPause` to the `PlopdownTemplate` union in `plopdown-templates.model.ts`
- [ ] 1.4 Regenerate the file schema with `npx nx run plopdown-file:generate-schema` (never hand-edit `src/schema/*`)
- [ ] 1.5 Add `plopdown-file` specs: a pause cue with a `duration` and one without both validate; a negative `duration` is rejected

## 2. Pause component

- [ ] 2.1 Create `cues/pause/pause.component.{ts,html,scss}` extending `PlopdownBaseComponent<PlopdownPause>`, with no side effects in the constructor
- [ ] 2.2 Implement `color` and `textPreview()` (e.g. "⏸ 5s" or "⏸ until resumed") for the cue timeline
- [ ] 2.3 In `ngOnInit`, fire only when the video is playing, not seeking, and within 1 s after `startTime`; then `pause()` and set `currentTime = startTime`
- [ ] 2.4 Render the resume control while holding: a focusable `<button>` fixed at bottom centre, showing the remaining seconds for a timed pause, with a click handler that stops propagation and calls `play()`
- [ ] 2.5 Start an RxJS `timer` for `duration` that calls `play()`; keep it in the component's `subs`
- [ ] 2.6 End the hold on any `play` event from the host video: hide the control, cancel the timer, remove the key listener
- [ ] 2.7 While holding, add a capture-phase `keydown` listener on `document` for `,` (−1/30 s) and `.` (+1/30 s), calling `preventDefault()` and `stopPropagation()`, skipping editable targets and modifier keys; the first step cancels the timer
- [ ] 2.8 In `ngOnDestroy`, unsubscribe everything without calling `play()`

## 3. Registration

- [ ] 3.1 Register `PauseComponent` in `PLOPDOWN_TEMPLATES`
- [ ] 3.2 Declare `PauseComponent` in `PlopdownCuesModule`

## 4. Tests

- [ ] 4.1 In component specs, stub `play()`/`pause()` on the test video element (jsdom doesn't implement them) and use fake timers
- [ ] 4.2 Reaching the cue while playing pauses and snaps `currentTime` to `startTime`
- [ ] 4.3 Entering more than 1 s past `startTime`, while seeking, or while already paused does not pause or show the control
- [ ] 4.4 A timed pause resumes after `duration`; a pause without one does not
- [ ] 4.5 The resume control resumes and disappears; a `play` event from the host also ends the hold and cancels the timer
- [ ] 4.6 `,` and `.` step by 1/30 s while holding and cancel the timer; ignored in an input or with a modifier held; not handled at all when no pause is held
- [ ] 4.7 Destroying the component mid-hold cancels the timer and does not call `play()`
- [ ] 4.8 Constructing the component without `ngOnInit` (as the cue timeline does) has no effect on the video
- [ ] 4.9 Cue renderer spec: a `PAUSE` cue resolves to `PauseComponent`

## 5. Verification

- [ ] 5.1 `pnpm test`, `pnpm run lint`, `pnpm run build:ext` and `pnpm run format:check` pass with the Nx cache skipped
- [ ] 5.2 Manual: in Firefox (`pnpm run start:ext-browser`), load a track with a timed pause, an untimed pause, and a PLOP cue in the same range. Check the exact-frame pause, timed resume, the resume control, the host player's play button, `,`/`.` stepping, and re-arming after seeking back
- [ ] 5.3 Manual: with an AUDIO cue playing across a pause cue, the clip pauses and resumes with the video
