## Context

See proposal.md — Why. What shapes the approach here is a bootstrapping problem: the workspace
cannot upgrade itself in place. Node 12 ships npm 6, which cannot write a modern lockfile, and Nx 12's
`migrate` must run under a Node that Nx 12 supports. Every phase therefore has to leave the workspace
in a state where the _next_ phase's tooling can run.

A third constraint of this shape — that nothing could be packaged until the first-party
`libs/web-extension` plugin had been compiled into `dist/` — has already been removed; see
Decision 4.

Two version ranges were verified against npm rather than assumed, and they set the whole shape of
the plan:

| Angular | Node                               | TypeScript     |
| ------- | ---------------------------------- | -------------- |
| 13      | `^12.20 \|\| ^14.15 \|\| >=16.10`  | `>=4.4.2 <4.7` |
| 14      | `^14.15 \|\| >=16.10`              | `>=4.6.2 <4.9` |
| 15      | `^14.20 \|\| ^16.13 \|\| >=18.10`  | `>=4.8.2 <5.0` |
| 16      | `^16.14 \|\| >=18.10`              | `>=4.9.3 <5.2` |
| 17      | `^18.13 \|\| >=20.9`               | `>=5.2 <5.5`   |
| 18      | `^18.19.1 \|\| ^20.11.1 \|\| >=22` | `>=5.4 <5.6`   |
| 19      | `^18.19.1 \|\| ^20.11.1 \|\| >=22` | `>=5.5 <5.9`   |
| 20      | `^20.19 \|\| ^22.12 \|\| >=24`     | `>=5.8 <6.0`   |
| 21      | `^20.19 \|\| ^22.12 \|\| >=24`     | `>=5.9 <6.1`   |
| 22      | `^22.22.3 \|\| ^24.15 \|\| >=26`   | `>=6.0 <6.1`   |

Angular 12 itself declares `node: ^12.14.1 || >=14.0.0`, which looks permissive but is misleading —
see Decision 2.

## Goals / Non-Goals

**Goals:**

- Land on Node 24, Nx 23.1.1, Angular 22.1.0 with every existing capability behaving identically.
- Keep every phase independently reviewable, independently revertable, and CI-green on its own.
- Preserve the workspace's enforced conventions across the move — in particular the RxJS lint rules
  and the strict Angular template settings, both of which are load-bearing.

**Non-Goals:**

- Manifest V2 → V3 (see proposal.md — Impact).
- Adopting Angular features unlocked by the upgrade — standalone components, signals, the new
  control-flow syntax, `provideHttpClient`. Migration schematics that _offer_ these are declined
  unless a hop hard-requires them. Refactoring and upgrading at once makes a bisect useless.
- Restructuring projects, renaming libs, or changing the six-app extension layout.
- Fixing pre-existing bugs found along the way. They get filed, not fixed here.

## Decisions

### 1. Chained `nx migrate` hops, one major per PR

Confirmed with the user. `nx migrate` writes `migrations.json` per hop and runs the framework's own
codemods, which is the only mechanism that knows about things like the `@nrwl/*` → `@nx/*` rename or
the `angular.json` → `project.json` split.

_Alternative considered — scaffold a fresh Nx 23 workspace and port source in._ Faster to a working
state and sheds a decade of dead config outright, but the 29-project wiring, the tags in `nx.json`,
the `/mock` secondary entry points, and the custom plugin would all be rebuilt by hand with no
codemod and no bisectable history. Rejected: the risk concentrates into one unreviewable step.

### 2. Phase 0 lands on Node 16 exactly — not the newest Node that Angular 12 permits

Angular 12 declares `>=14.0.0`, which suggests Node 18 or 20 would work. It will not. Angular 12's
build pipeline is webpack 4, which hashes with md4 via Node's crypto. Node 17 switched to OpenSSL 3,
which removed md4 from the default provider, and webpack 4 dies with
`error:0308010C:digital envelope routines::unsupported`. The usual workaround
(`NODE_OPTIONS=--openssl-legacy-provider`) is a trap here: it would have to be threaded through
every npm script and both CI workflows, then unpicked later.

Node 16 is the highest runtime that runs Angular 12 and Nx 12 unmodified while still shipping an npm
(8) that writes a current lockfile. That makes it the only correct first stop.

This is confirmed rather than predicted. CI's `Build Affected` job had no `setup-node` step at all —
only the `setup` job pinned a version — so it ran `ci:build` on whatever Node the runner image
shipped, by now v22. It died on exactly this error, then hung until cancelled. Fixed by pinning every
job; the failure is the empirical case for stepping Node one version at a time rather than jumping.

### 3. The lockfile regenerates alone, in its own PR, before any framework change

`package-lock.json` goes from lockfileVersion 1 to 3 as a whole-file rewrite. Bundled with a
framework hop it would hide the hop's real diff completely. Alone, it is a mechanical change a
reviewer can accept on the strength of a green CI run.

The dependency _versions_ do not change in this PR — only the lockfile format and the runtime. That
distinction is what makes it reviewable.

### 4. Replace the `libs/web-extension` Nx plugin with `run-commands`

**Signed off and already executed — ahead of Phase 0, on the Angular 12 toolchain.**

Doing it first rather than at Phase 4 was the better trade: it is a self-contained change that can be
verified against a known-good toolchain, where "working" is still well defined, and it removes the
single riskiest item from the heaviest phase. It also deletes the bootstrap ordering problem for
every phase that follows, instead of only the last six.

On Nx 12 the executor is named `@nrwl/workspace:run-commands`; `nx migrate` renames it to
`nx:run-commands` during the hops.

The plugin wrapped two `web-ext` invocations (`build` and `run`) as Nx builders, plus a schematic. It
cost more than it earned:

- `plopdown-ext`'s builder was the path `./dist/libs/web-extension:build`, so the plugin had to be
  compiled into `dist/` before anything else could build — the documented footgun that broke every
  clean checkout and needed a dedicated CI step.
- It was built with `@nrwl/node:package`, which does not survive to modern Nx, and it shipped
  `builders.json` / `collection.json` in a format that predates the executor/generator split.

Porting it would have meant rewriting the builder API, the schema files, and the packaging target —
first-party migration work with no codemod behind it. The replacement is a `run-commands` target that
copies the static assets and then calls `web-ext` with the same arguments, which deletes the
bootstrap ordering problem outright and removes the dedicated CI step.

_Alternative considered — port the plugin._ This would be the right call if the schematic were used
to scaffold new extensions, or if the plugin were meant for publication. Neither holds.

**Checked, not assumed.** `@plopdown/web-extension` is not published to npm (`npm view` returns 404), and the
only consumer of its schematic is `apps/web-extension-e2e` — scaffold boilerplate from
`@nrwl/nx-plugin` that never executes: it is absent from `jest.config.js`'s `projects` array, so
`npm test` and `ci:test` both skip it. It also invokes `@plopdown/web-extension:webExtension` while
`collection.json` registers the schematic as `web-extension`, and uses the `done`-callback-plus-async
form that Jest 27 rejects outright — so it could not pass as written. The schematic has no live
consumer. Replace the plugin, and retire `apps/web-extension-e2e` with it.

### 5. Swap `eslint-plugin-rxjs` for `@smarttools/eslint-plugin-rxjs` at the flat-config hop

The pinned plugin (`latest`, resolving to 5.0.3, last published 2023-06-16) predates flat config and
will not load under ESLint 9. The rules it enforces are not decorative — `no-nested-subscribe`,
`no-subject-value`, and `no-unbound-methods` guard exactly the long-lived-pipeline pattern that every
background component is built on. The maintained fork carries the same rule set under a new scope.

_Alternative considered — drop the RxJS rules._ Rejected: it would silently retire an enforced
convention during an upgrade that is supposed to change nothing.

**Corrected in Phase 6 — this belongs at Phase 10, not Phase 6.** The decision assumed flat config
would force the swap partway through. It does not: `angular-eslint` 18 through 21 and `@nx/eslint`
20 through 22 all accept `eslint ^8.57.0 || ^9.0.0`. ESLint 8 is dropped only by `angular-eslint` 22
and `@nx/eslint` 23 — the Phase 10 versions. Two details of the original text have also aged out:
the repo is on ESLint 8, not 7, and the plugin is on 5.0.3, not 3.3.5, because Phase 1 had to move
it when `@nx/linter` pulled ESLint 8 forward.

### 6. Decline optional migration schematics; take only what a hop requires

Angular's `ng update` offers opt-in codemods at most majors. Each one accepted widens the diff with
changes unrelated to the upgrade. Anything optional is deferred to its own change.

### 7. Every phase must end green on the same four commands

`npm run build:ext`, `npm run build plopdown-ext`, `npm test`, `npm run lint` — plus CI's
`node-version` raised in the same commit as `.nvmrc`. A phase that cannot reach all four does not
merge; it gets split.

The gate is not yet enforceable as written. A green `Build Affected` does not currently prove the
extension is loadable, because `plopdown-ext:build` can package before the app bundles it needs
exist — see task 1.8. Phase 0 fixes that.

### 8. Manual browser validation happens once, after Phase 10

The owner's call, and theirs to make: no phase gates on loading the extension in Firefox. Each phase
merges on CI alone, and the whole behavioural surface is checked in one pass at the end (task
group 12).

The cost is bisection distance. CI cannot see a cue that renders at the wrong time, a popup that
stops reflecting status, or a content script that no longer waits for its permission grant. If any of
those surface at close-out, the cause could have entered at any of eleven merges — and the RxJS hop,
the likeliest culprit, is five phases back by then. The phase merges on `master` are the bisection
points, which is a further reason to keep them as separate squashed commits rather than collapsing
the phases.

_Alternative considered — validate at Phases 1, 4, and 6._ Cheaper to debug, since a failure is
localised to one hop. Declined by the owner in favour of a single pass. Task 7.8 partially covers the
gap by asserting the message bus still delivers before RxJS moves.

## Risks / Trade-offs

- **RxJS 7 breaks the message bus silently** → The `PortPublisher`/`PortSubscriber` pair and every
  background pipeline depend on `share`, `combineLatest`, and subscription timing, all of which
  changed in RxJS 7. A regression here means messages stop arriving with no error and no failing
  unit test. This is the sharpest risk in the plan, and the owner has chosen to defer manual
  validation to after Phase 10 (Decision 8), which removes the mitigation this originally carried.
  Partial replacement: task 7.8 adds automated coverage asserting a published command actually
  reaches its subscriber, across both the `runtime.sendMessage` and `tabs.sendMessage` fan-out,
  before RxJS moves. That catches a dead bus but not subtler timing changes — a cue rendering a beat
  late, or a popup that updates only on the second open, still reaches close-out unnoticed.

- **`nx migrate` codemods fail on a 5-year-old workspace** → Migration scripts assume config shapes
  Nx 12 predates. Mitigation: run each hop's `migrations.json` one entry at a time rather than as a
  batch, and hand-apply any that throw. Expect this at the Nx 16 hop, where projects move out of
  `angular.json`.

- **The extension is unbuildable mid-Phase 4** → Whichever path Decision 4 takes, there is a window
  where the plugin is neither old nor new. Mitigation: Phase 4 is one PR that is not merged until
  `build:ext` produces a loadable extension.

- **webpack 5 rewrite of the content-script config** → `tools/webpack/content-script-webpack.config.js`
  targets webpack 4 and breaks at Angular 13, the very first hop. Mitigation: budget it into Phase 1
  rather than discovering it there; the content script is a single-bundle build, so the config is
  small.

- **Bulma 0.9 → 1.x changes rendered CSS** → Unlike the rest of this upgrade, this one is visible to
  users. Mitigation: hold Bulma at 0.9 through every framework hop and move it in a separate change
  with visual review. It has no coupling to Angular's version.

- **Ten PRs is a long queue and master keeps moving** → Each phase touches root-level implicit
  dependencies, so any parallel work conflicts. Mitigation: run the phases consecutively without
  parallel feature work, or accept rebases.

- **Trade-off accepted:** ten sequential PRs is slower than one, and each intermediate stop pins the
  workspace to an Angular version that is itself out of support. The upgrade is only complete at
  Phase 10; stopping partway leaves the repo somewhere unsupported. That cost buys a bisectable
  history and a reviewable diff at each step.

## Migration Plan

Phases are consecutive; each is one PR, each ends green on the Decision 7 commands, and each pauses
for review.

| Phase | Lands              | Node | Notes                                                                                                                                                                          |
| ----- | ------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | Lockfile + runtime | 16   | No dependency version changes. Lockfile v1 → v3, npm 6 → 8.                                                                                                                    |
| 1     | Angular/Nx 13      | 16   | webpack 4 → 5; content-script config rewrite. TS 4.6.                                                                                                                          |
| 2     | Angular/Nx 14      | 16   | TS 4.8.                                                                                                                                                                        |
| 3     | Angular/Nx 15      | 16   | TS 4.9.                                                                                                                                                                        |
| 4     | Angular/Nx 16      | 18   | Heaviest. `@nrwl/*` → `@nx/*`, ngcc + `decorate-angular-cli.js` removed, `angular.json` → `project.json`, jest `projects` array → inference, Decision 4 on the plugin. TS 5.1. |
| 5     | Angular/Nx 17      | 18   | TS 5.4.                                                                                                                                                                        |
| 6     | Angular/Nx 18      | 18   | ESLint flat config + `@smarttools/eslint-plugin-rxjs`. TS 5.5.                                                                                                                 |
| 7     | Angular/Nx 19      | 18   | TS 5.8.                                                                                                                                                                        |
| 8     | Angular 20 / Nx 21 | 22   | Nx and Angular majors diverge from here; `nx migrate` resolves the pairing. TS 5.9.                                                                                            |
| 9     | Angular 21 / Nx 22 | 22   |                                                                                                                                                                                |
| 10    | Angular 22 / Nx 23 | 24   | TS 6.0. Jest 30, remaining runtime deps.                                                                                                                                       |

RxJS 6 → 7 is scheduled at the earliest hop that requires it and is not combined with another
framework change in the same commit, per the first risk above.

**Rollback:** each phase is a single squashed merge on `master`, so rollback is a revert of one
commit plus `npm ci` at the prior `.nvmrc`. No phase is rolled back partially — a broken phase is
reverted whole and re-attempted.

**Verification beyond CI:** CI proves build, lint, and unit tests. It does not prove the extension
loads or behaves. That check happens once, after Phase 10 — see Decision 8 and task group 12.

## Open Questions

- Is `apps/devtool` / `apps/devtool-panels` still wanted? The `devtools_page` entry is commented out
  in `manifest.json`, so both apps are built and carried through ten migrations while shipping
  nothing. Retiring them would remove two projects from every hop. Safely deferrable — carrying them
  costs build time, not correctness, and the answer changes no earlier phase.
- Does `apps/testing-sandbox` still earn its place? Same shape of question, same answer: defer.

The question of whether the `web-extension` schematic has external consumers is resolved in
Decision 4 — it does not.
