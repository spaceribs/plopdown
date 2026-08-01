# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Plopdown is a Firefox-first web extension (Manifest V2) that overlays annotation tracks on top of
any HTML5 video on the web, plus the promotional site at plopdown.video. It is an Nx monorepo of
Angular 12 apps and libs under the `@plopdown/*` npm scope.

## Commands

```bash
npm install                  # postinstall runs decorate-angular-cli.js + ngcc
npm run build:ext            # build all six extension surfaces (production)
npm run build                # build the default project (plopdown-ext) -> zip in dist/extensions
npm run build website -- --prod   # website builds into /docs (GitHub Pages)

npm test                     # all Jest projects
npm run lint                 # nx workspace-lint && ng lint
npm run format:write         # prettier across the workspace
npm run format:check
```

Dev loop for the extension — two terminals:

```bash
npm run start:ext            # rebuild the six app bundles on change
npm run start:ext-browser    # web-ext run: temporary Firefox with the extension loaded
```

Targeting one project:

```bash
npx nx test messages
npx nx test messages --testFile=libs/messages/src/lib/messages.service.spec.ts
npx nx test messages --testNamePattern="publishes status"
npx nx lint background
npx nx build content-script
npx nx dep-graph
```

CI (`.github/workflows/pull_requests.yml`) runs `ci:lint` / `ci:build` / `ci:test`, which are
`nx affected` against `remotes/origin/master`. `affected.defaultBase` is `master`.

## Architecture

### Six apps, one extension

Each extension surface (`background`, `content-script`, `browser-action`, `options`, `devtool`,
`devtool-panels`) is a **separate Angular application** that builds into a subdirectory of
`dist/apps/plopdown-ext/`. The `plopdown-ext` project contributes only `manifest.json` and static
assets, and declares the surfaces as `implicitDependencies` in `nx.json`. There is no single app
entry point — a feature usually spans two or three of these apps plus a lib.

### Packaging the extension

`plopdown-ext`'s `build` target is a `run-commands` pair: a small Node script copies
`apps/plopdown-ext/src` (manifest, icons, `_locales`) into `dist/apps/plopdown-ext`, then `web-ext`
packs that directory into a zip in `dist/extensions`. The copy merges rather than replaces, so it
does not matter whether it runs before or after the six app builds land in their subdirectories.

This used to be a local Nx plugin (`libs/web-extension`) whose builders were referenced through the
path `./dist/libs/web-extension:build` — meaning the plugin had to be compiled into `dist/` before
anything else could build. That bootstrap step is gone; a clean checkout can build the extension
straight after `npm install`.

### The message bus

Apps never call `browser.runtime.sendMessage` directly. All cross-surface traffic goes through
`@plopdown/messages`, which defines three `Source`s (`BACKGROUND`, `BROWSER_ACTION`,
`CONTENT_SCRIPT`) and, per source, a pub service and a sub service built on the
`PortPublisher` / `PortSubscriber` abstract classes.

- Messages are `Command<Name, Args>` — a string literal name plus a positional args tuple, unioned
  per source (e.g. `BackgroundCommand` in `background.model.ts`).
- Publishers push into a `command$` Subject; the base class stamps `source`, logs, and fans out over
  `runtime.sendMessage` _and_ `tabs.sendMessage` when a `TabsService` is injected.
- Subscribers expose `filterCommand('BG_STATUS')`, returning a shared, typed Observable.

Adding a cross-app message means editing the source's `*.model.ts` (add the `Command` type, add it
to the union), the pub service (a method that `next`s it), and the sub service (a `filterCommand`
getter).

### The background page is headless Angular components

`apps/background` has no UI. Its `AppComponent` template is a list of feature components
(`<plopdown-get-status>`, `<plopdown-sync-databases>`, …) with empty or placeholder templates, each
owning one long-lived RxJS pipeline in `ngOnInit`. Most are gated behind an `extEnabled$` async
block, so a disabled extension tears the pipelines down. New background behaviour is a new component
in `apps/background/src/app/<feature>/`, added to that template — not a service.

The prevailing lifecycle idiom throughout the codebase: a private `subs = new Subscription()`,
`subs.add(...)` in `ngOnInit`, `subs.unsubscribe()` in `ngOnDestroy`.

### Content scripts are injected at runtime

`manifest.json` declares **no** `content_scripts`. It requests `optional_permissions: ["*://*/*"]`,
and the background page's `install-content-script` component injects the content script into a tab
only after the user grants origin permission for that site. Anything assuming a statically declared
content script will be wrong.

### Domain model

- **`VideoRef`** (`@plopdown/video-refs`) — a video's location in a page, identified by **xpath**
  plus frame metadata, linked to a `TrackRef`. XPath identity is why DOM changes on a host site
  (e.g. a player rewrite) break attachments.
- **`Track`** (`@plopdown/tracks`) — a named, authored collection of `Cue`s
  (`@plopdown/plopdown-cues`) for a given video. It is a PouchDB document: `_id`, `_rev`,
  `_attachments`.
- **Persistence** — `@plopdown/pouchdb` wraps local PouchDB; `@plopdown/remotes` holds remote server
  configs, and the background's `sync-databases` component replicates video-refs and tracks. A
  remote's `sync` flag decides the direction: `true` gets bidirectional replication, `false` is
  pulled read-only.
- **`@plopdown/plopdown-injector`** renders cues over the video element in the page, and
  `hash-video-refs.service.ts` supports a share format: a `#plopdown:<lz-string-compressed>` URL
  hash decodes into a `PlopdownFile`, which becomes an ephemeral `VideoRef` + `Track`.

### Browser API access and mocks

`@plopdown/browser-ref` wraps `webextension-polyfill` as injectable Angular services
(`RuntimeService`, `TabsService`, `WebNavigationService`, `PermissionsRequestService`,
`BrowserActionService`). Use these rather than touching `browser.*`.

Most libs ship a second entry point at `@plopdown/<lib>/mock` (mapped in `tsconfig.base.json`,
sourced from `libs/<lib>/mock/`) holding the mock module and services used by specs. When you add a
service to a lib that has a `mock/`, add its mock too — sibling specs will expect it.

## Conventions

- **Registering a new lib/app** touches four files: `angular.json` (targets), `nx.json` (project +
  tags), `tsconfig.base.json` (the `@plopdown/*` path, plus a `/mock` path if applicable), and — for
  anything with tests — `jest.config.js`'s `projects` array.
- **`libs/plopdown-file/src/schema/*` is generated.** Edit `plopdown-file.model.ts`, then run
  `npx nx run plopdown-file:generate-schema` (ts-json-schema-generator + ajv). Never hand-edit the
  `.json` or `.js` schema.
- **The extension version lives in two places** — `package.json` and
  `apps/plopdown-ext/src/manifest.json` — and they must be bumped together.
- **`manifest.json` contains `//` comments** (the disabled `devtools_page` line). It is not
  parseable with plain `JSON.parse`.
- **Lint enforces RxJS discipline** via `eslint-plugin-rxjs`: no nested `subscribe`, no
  `subject.value`, no unbound methods, no rxjs internal/index imports. `@typescript-eslint` is
  configured with `no-explicit-any` off but unused vars as an error (prefix with `_` to ignore).
- **Strict Angular templates** — `strictTemplates`, `strictNullChecks`, `noImplicitAny`, and
  `fullTemplateTypeCheck` are all on in `tsconfig.base.json`.
- **Commit messages** are short imperative sentences ("Fix a pointer event issue"), not
  conventional-commit prefixes.
- The repo pins Node 12 (`.nvmrc` = `lts/erbium`) and `package-lock.json` is lockfileVersion 1
  (npm 6). Regenerating the lockfile with a modern npm would be a large, breaking diff.

## Spec-driven changes

This repo uses OpenSpec (`openspec/config.yaml`, `/opsx:*` commands in `.claude/`). For non-trivial
feature work, prefer starting with `/opsx:propose` over editing code directly.
