## Purpose

Lets a track author stop the host video at a chosen moment, so viewers can study what is on screen
before playback continues — on its own after a set time, or when the viewer decides.

## ADDED Requirements

### Requirement: Pause cue data

A pause cue SHALL be a cue whose data has type `PAUSE` and an optional `duration` in seconds. The
cue's `startTime` SHALL be the moment playback is paused. A `duration` SHALL be measured in real
time, not media time, because the video does not advance while paused. When `duration` is absent
the pause SHALL hold until the viewer resumes.

#### Scenario: Timed pause is valid

- **WHEN** a Plopdown file contains a cue with data `{ "type": "PAUSE", "duration": 5 }`
- **THEN** the file passes schema validation

#### Scenario: Pause without a duration is valid

- **WHEN** a Plopdown file contains a cue with data `{ "type": "PAUSE" }`
- **THEN** the file passes schema validation
- **AND** the pause holds until the viewer resumes

#### Scenario: Negative duration is rejected

- **WHEN** a Plopdown file contains a pause cue with a negative `duration`
- **THEN** the file fails schema validation

### Requirement: Pausing at the cue's start

When playback reaches a pause cue's `startTime` while the video is playing, the system SHALL pause
the host video and position it at the cue's `startTime`, so the frame shown is the one the author
chose.

#### Scenario: Playback reaches the cue

- **WHEN** the video is playing and playback reaches a pause cue's `startTime`
- **THEN** the host video pauses
- **AND** the video's position is the cue's `startTime`

#### Scenario: Seeking into the middle of the cue does not pause

- **WHEN** the viewer seeks to a position inside a pause cue's time range, but not at its start
- **THEN** the video is not paused by the cue

#### Scenario: Reaching the cue while already paused does nothing

- **WHEN** the video is already paused as playback lands on a pause cue's `startTime`
- **THEN** the cue does not show a resume control or start a timer

### Requirement: Timed resume

A pause cue with a `duration` SHALL resume playback on its own once that many seconds have passed,
unless the viewer has already resumed, stepped frames, or left the cue.

#### Scenario: Duration elapses

- **WHEN** a pause cue with `duration` 5 has held the video for 5 seconds
- **THEN** the host video resumes playing from the cue's `startTime`

#### Scenario: Viewer resumes before the duration ends

- **WHEN** the viewer resumes playback before the `duration` has elapsed
- **THEN** playback continues
- **AND** the cue does not pause or resume the video again when the duration would have elapsed

### Requirement: Resume control

While a pause cue is holding the video, the system SHALL show a control the viewer can activate to
resume playback. For a timed pause the control SHALL show the time remaining. Using the control
SHALL NOT also trigger the host page's own click handling on the video.

#### Scenario: Viewer resumes with the control

- **WHEN** a pause cue is holding the video and the viewer activates the resume control
- **THEN** the host video resumes playing
- **AND** the resume control is no longer shown

#### Scenario: Resuming through the host player

- **WHEN** a pause cue is holding the video and the viewer presses play in the host page's own
  player
- **THEN** playback continues
- **AND** the resume control is no longer shown

#### Scenario: Control is keyboard accessible

- **WHEN** a pause cue is holding the video
- **THEN** the resume control can be focused and activated from the keyboard

### Requirement: Frame stepping while paused

While a pause cue is holding the video, the viewer SHALL be able to step backwards with the `,` key
and forwards with the `.` key, by about one frame (1/30 s) per press. Stepping SHALL keep the video
paused and cancel any timed resume. Key presses SHALL be ignored while focus is in a text input,
textarea or editable element, or while a modifier key is held.

#### Scenario: Step forward

- **WHEN** a pause cue is holding the video and the viewer presses `.`
- **THEN** the video's position moves forward by 1/30 s
- **AND** the video stays paused

#### Scenario: Stepping cancels the timed resume

- **WHEN** a timed pause cue is holding the video and the viewer presses `,` or `.`
- **THEN** the video does not resume when the `duration` would have elapsed

#### Scenario: Typing is not intercepted

- **WHEN** a pause cue is holding the video and the viewer types `.` into a text field on the host
  page
- **THEN** the character is entered into the field and the video does not step

#### Scenario: No stepping when no pause is held

- **WHEN** no pause cue is holding the video and the viewer presses `,` or `.`
- **THEN** Plopdown does not handle the key press

### Requirement: Firing once per pass

A pause cue SHALL pause the video at most once each time playback passes through its `startTime`.
Resuming SHALL NOT pause the video again at the same cue. Seeking to before the cue's `startTime`
SHALL re-arm it.

#### Scenario: Resuming does not re-pause

- **WHEN** a pause cue has paused the video and the viewer resumes
- **THEN** playback continues past the cue without pausing again

#### Scenario: Seeking back re-arms the cue

- **WHEN** a pause cue has fired, the viewer seeks to before its `startTime`, and playback reaches
  its `startTime` again
- **THEN** the host video pauses again at the cue's `startTime`

### Requirement: Leaving the cue ends the hold

If the video's position leaves a pause cue's time range while it is holding the video, the system
SHALL stop holding: it SHALL remove the resume control and cancel any timed resume, and SHALL NOT
change whether the video is playing.

#### Scenario: Viewer seeks away while paused

- **WHEN** a pause cue is holding the video and the viewer seeks outside the cue's time range
- **THEN** the resume control is no longer shown
- **AND** the video does not resume on its own afterwards

### Requirement: Track previews do not pause

Showing a track's cues in a preview or timeline, as opposed to rendering them over a playing video,
SHALL NOT pause any video.

#### Scenario: Timeline lists a pause cue

- **WHEN** a track containing a pause cue is shown in the embed's cue timeline
- **THEN** no video is paused
- **AND** the timeline shows the pause cue with a short description of how long it holds
