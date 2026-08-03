# Manual test plan

Runs task group 12 of `tasks.md` — the manual validation deferred through all eleven upgrade
phases — plus a CSS pass covering the postcss bump that landed after group 12 was written.

CI proves the workspace builds, lints and passes unit tests. None of that proves the extension
works in a browser. This is the first time that gets checked, so a failure here could have been
introduced by any phase, not just the most recent one. See [If something fails](#if-something-fails).

Budget roughly 45 minutes. Part A is the fastest way to catch a broad regression, so run it first.

---

## Before you start

```bash
proto use                    # installs the versions pinned in .prototools
npm ci
npm run build:ext            # six surfaces, production
npm run build plopdown-ext   # manifest + icons + zip
```

Any Node 24.15+ works — `@angular/build` refuses to run below it, and nothing here depends on proto
itself. If you are on a checkout that still has `.nvmrc` rather than `.prototools`, `nvm use` is the
equivalent first line.

Then, in a second terminal:

```bash
npm run start:ext-browser    # web-ext: temporary Firefox with the extension loaded
```

That profile is disposable — it starts with no permissions, no tracks and no remotes, which is what
several steps below assume. If you reuse a profile between runs, redo steps that depend on a
first-run state (12.2, 12.7).

You will also want a page with a plain HTML5 `<video>` on it. Any site works; a page with a single
player is easiest, because the xpath the extension records is then unambiguous.

---

## Part A — CSS after the postcss bump

New since group 12 was written. postcss went 8.3.5 → 8.5.25 and an `overrides` entry collapsed six
copies of it in the tree down to one, so **every stylesheet in the workspace is now processed by a
version none of it has been built against before**. The build passing only proves postcss did not
throw; it does not prove the output is right.

Two things make this worth eyeballing rather than trusting: both `browser-action` and `options`
open their sass with `@charset "utf-8"`, and the popup's toggle comes from the external
`bulma-switch` package. Charset handling and vendored external sass are exactly what shifts across
a postcss minor.

- [ ] **A1 — Popup chrome.** Click the toolbar icon. The four tabs (Scan, Permissions, Videos,
      Tracks) should sit on one row with the active one underlined — not a bare vertical list of
      links. A vertical list means Bulma's `tabs` component did not survive.
- [ ] **A2 — The toggle.** On the Scan tab, "Plopdown Enabled" should render as a **sliding switch**,
      not a default square checkbox. This is `bulma-switch`, the only external sass package in the
      build, and the single most likely thing to break.
- [ ] **A3 — Hero panels.** Still on Scan: the status panel should be a filled colour block with a
      title and subtitle. Ready is green (`is-success`); the other states are dark. Unstyled text on
      a white background means `hero` was dropped.
- [ ] **A4 — Options chrome.** Open the options page (about:addons → Plopdown → Preferences, or
      `/options/index.html`). The top navbar should be **dark with the logo and six links**
      (Setup, Videos, Tracks, Permissions, Remotes, Logs) laid out horizontally.
- [ ] **A5 — Icons and emoji.** Confirm the logo renders and that any emoji in cue overlays (Part B)
      are not mangled. Garbled glyphs point at the `@charset` line being mishandled.

If A1–A5 all look right, postcss is fine and anything you hit later is a pre-existing upgrade bug
rather than a stylesheet problem.

---

## Part B — Task group 12

### 12.1 Load the extension

- [ ] `npm run start:ext-browser` opens Firefox with Plopdown loaded and the toolbar icon present.
- [ ] Open the Browser Console (Ctrl+Shift+J) and keep it open for the rest of the run. **Background
      pipeline errors surface only there** — the background page has no UI.

Expected: no red errors on load. Note anything from `@plopdown/*` verbatim.

### 12.2 Origin permission gates the content script

The manifest declares **no** `content_scripts`. Injection happens from the background page only
after you grant an origin, so this step is really testing that gate.

- [ ] Navigate to your video page. Open the popup — it should show **"No Access"** with a
      "Request Access" button (not "Ready").
- [ ] Confirm in DevTools that no Plopdown elements exist in the page yet.
- [ ] Click "Request Access" and accept the Firefox permission prompt.
- [ ] The page now gets the content script — the Plopdown menu should appear at the **top-right
      corner of the video**.

Expected: nothing injected before the grant, injected after, without a manual reload. If the popup
shows "Could not retrieve URL, please refresh the page", reload and retry — that path is a known
fallback, not a failure.

> If you land on **"No Permissions"** instead of "No Access", the profile has no origins at all yet;
> use the button to open the permissions page and grant one there.

### 12.3 Cues render over the video

- [ ] Attach a track to the video (via the popup's Tracks tab, or the in-page menu).
- [ ] Play the video and confirm cues appear **and disappear** at their timestamps.
- [ ] Confirm overlays are positioned **relative to the video element**, not the page — scroll the
      page mid-playback and check they stay locked to the video.
- [ ] Resize the window and confirm they track the video's new size.

Expected: cues sit inside the video box at all sizes. This is the path that task 11.9e's
`ComponentFactoryResolver` rewrite touched — the largest hand-written change of the upgrade — so
misplacement or a cue that never appears matters most here.

### 12.4 The message bus is live

The popup gets its status by messaging the background page. Task 11 flagged this as the thing RxJS 7
is most likely to have broken **silently** — a dead pipeline looks like a stuck spinner, not an error.

- [ ] With the popup open, confirm it shows **"Ready"** on a permitted page with a track.
- [ ] Navigate to a _different_ tab with no permission and reopen the popup — it should show
      "No Access" instead. The status must follow the active tab.
- [ ] Click "Refresh" on the Ready panel and confirm it does not hang on "Scanning…".

Expected: status changes with the tab. A permanent "Scanning…" spinner means the bus is not
answering — capture the Browser Console output.

### 12.5 Remotes and the sync flag

- [ ] Options → **Remotes** → add a remote.
- [ ] Toggle its `sync` flag on. Expected: **bidirectional** replication — a track created locally
      appears on the remote.
- [ ] Toggle it off. Expected: **pull only, read-only** — remote changes arrive locally, local
      changes do not go up.
- [ ] Options → **Logs** should show the replication activity.

Expected: direction follows the flag. Without a remote CouchDB to hand, at minimum confirm the
remote saves, survives a reload, and that Logs shows a connection attempt rather than a silent
no-op.

### 12.6 A `#plopdown:` share URL decodes

Nothing in the repo ships a sample file, so generate one:

```bash
node tools/scripts/make-share-url.js "https://example.com/watch?v=abc"
```

Pass your real video page URL. The script defaults the xpath to `//video` (the first video in the
document); pass a second argument to override it if your page has several. It prints a full URL
with the hash appended, and validates the payload against the extension's own schema and
round-trips the compression before printing — so if it prints, the URL is well-formed.

- [ ] Open the printed URL in the Firefox instance.
- [ ] Confirm three cues render as an **ephemeral** VideoRef and Track: an INFO card at 1–8s, a PLOP
      with a 📌 at 5–15s, and a SHAPE outline at 12–25s.
- [ ] Confirm they are **not** persisted — check Options → Tracks; the track should not be listed.

Expected: cues render from the hash alone, and nothing is written to PouchDB. This step also covers
three of the four cue templates, so it doubles as the widest single check of cue rendering.

### 12.7 The enable/disable toggle tears pipelines down

The background `AppComponent` gates six feature components behind `extEnabled$`. Disabling should
destroy them, not just hide them.

- [ ] In the popup, switch **"Plopdown Enabled"** off.
- [ ] Expected: the toolbar icon changes to its disabled state, and the popup shows
      **"Scanning Disabled"**.
- [ ] Reload the video page. Expected: **no content script injected, no overlays** — even though the
      origin is still granted.
- [ ] Re-enable via the "Enable" button. Expected: scanning resumes and overlays come back after a
      reload, with no errors in the Browser Console.

Expected: disabling is a real teardown. Overlays that keep rendering while disabled mean the
pipelines survived the gate.

---

## Part C — Website

`npm run build website -- --prod` publishes into `/docs` for GitHub Pages, and its stylesheet goes
through the same postcss.

- [ ] Serve `docs/` (`npx http-server docs`) and load it.
- [ ] Confirm layout and fonts render — the site uses the same Bulma base as the extension.
- [ ] Confirm the demo video and any embedded cues still work.

---

## If something fails

Record what you saw, then localise it before assuming the most recent change caused it:

1. **Is it CSS or behaviour?** Part A isolates this. If A1–A5 pass, postcss is not your problem.
2. **Does it reproduce on the pre-upgrade build?** If yes it is a pre-existing bug, not a
   regression — task 1.1 anticipated some of these.
3. **Otherwise bisect the phase merges on `master`.** Eleven phases landed as separate merges; the
   failing behaviour will bracket to one of them.

Deliberately out of scope, per task 13.5: Manifest V3, Bulma 1.x, `plyr` 3.8, the accessibility
findings behind the three disabled template rules, and the 45 components left on
`ChangeDetectionStrategy.Eager`.

## Recording the result

Tick the boxes in group 12 of `tasks.md` as you go. Group 12 is the last unchecked group in the
change — once it is complete and green, `upgrade-toolchain` is ready to archive.
