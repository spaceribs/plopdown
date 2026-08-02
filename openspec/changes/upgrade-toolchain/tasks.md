Each numbered group is one PR and one review pause. A group is done only when the Decision 7 gate
passes: `npm run build:ext`, `npm run build plopdown-ext`, `npx nx build website`, `npm test`, and
`npm run lint` all succeed, with `.nvmrc` and both CI workflows on the group's Node version.

`nx build website` is in that list because Phase 3 nearly shipped without it. `build:ext` covers
only the six extension surfaces, so a change that broke the website — Angular 15 removing the `~`
prefix from Sass imports, which four stylesheets used — passed every other gate command and would
have failed `deploy_website.yml` on the next push to `master`, taking plopdown.video down.

**Rules every framework hop must follow.** Learned the hard way in Phase 1; each cost real time.

1. **Apply migrations one at a time, never as a batch.** `nx migrate --run-migrations` stopped at
   the 8th of 39 and still exited 0. Trusting the exit code would have shipped the phase with 31
   migrations silently unapplied. Wrap each in its own `migrations.json` and give it a timeout —
   one of them hung for 34 minutes.
2. **Audit dependency drift after every regeneration.** npm cannot reconcile a lockfile across a
   framework major, so regeneration is forced — and it re-resolves every `^` range to today's
   newest match. In Phase 1 that moved 20 direct dependencies and broke two builds for reasons
   unrelated to Angular. Diff the new lockfile against the previous phase's and pin back anything
   that moved but shouldn't have. `@types/*` packages are **not** inert: they are what tsc reads.
3. **Never commit a lockfile without `npm ci --dry-run`.** `npm install` succeeding does not mean
   `npm ci` accepts the result. Skipping this failed CI's install job on four consecutive commits,
   and because lint/build/test all declare `needs: setup`, every one of them was skipped rather
   than run — CI looked broken rather than failing.
4. **Expect undeclared dependencies to surface.** Two packages the repo genuinely uses were never
   in `package.json` and worked only because npm's hoisting happened to expose them: `ajv`
   (Phase 0) and `@nrwl/linter` (Phase 1). Each presented as an unrelated-looking error.
5. **Budget for the dependency graph, not the framework.** Angular 13 needed four lines of source
   change. Everything else in Phase 1 was resolution archaeology. Expect the same ratio.
6. **A migration that throws on missing config may be the thing that creates it.** Phase 1 skipped
   `13-10-0-update-tasks-runner` because it threw on an absent `tasksRunnerOptions`, reasoning that
   a workspace with no custom task runner had nothing to migrate. Creating that block was its
   purpose, and Nx 14 refuses to run any target without it — the skip deferred the break by one
   phase. Before skipping, distinguish a migration that _writes_ required config from one that
   _rewrites_ code you do not have (`@nrwl/nest` is genuinely the latter: no project, no imports,
   and Nx 14 stopped queueing it at all).
7. **Check what a rename migration did to prose.** Nx 16's `@nrwl/*` → `@nx/*` rename is a blind
   text replace across the repo, markdown included. It rewrote seven lines of these planning
   documents into false statements — "On Nx 12 the executor is named `@nx/workspace:run-commands`"
   (it was `@nrwl/`), and a task that read "renamed `@nx/workspace:run-commands` to
   `nx:run-commands`". Historical references to old package names are correct as written; revert
   them and keep the rename to config and source.
8. **A complete artifact does not mean the build scripts work.** In Phase 2 `build:ext` failed on
   all six apps while tests passed, `plopdown-ext` built, and the zip contained every surface —
   because `npm run build` builds its own dependencies and masked it. Check the exit status of each
   gate command, not just the artifact.
9. **Verify that a gate command runs what its name implies.** `npm test` was `ng test`, which
   resolves to the default project — `plopdown-ext`, which has only `build` and `serve`. It had
   been failing with "Cannot find configuration for task plopdown-ext:test" since before this
   upgrade began, while `CLAUDE.md` documented it as "all Jest projects". Every phase gate that
   claimed a passing `npm test` was reading the exit code of a different command. Fixed in Phase 7
   by pointing `test` at `nx run-many --target=test --all`, matching `lint`'s existing shape.
10. **A scripted config edit can produce a duplicate JSON key, and the last one wins.** Phase 6
    inserted `"@angular-eslint/prefer-standalone": "off"` into every project's `.eslintrc.json` by
    script. Three files already had a `rules` block later in the same override object, so the
    insert became a second `rules` key that `JSON.parse` silently discards. In `apps/options` that
    dropped `@angular-eslint/component-selector` for a whole phase. Note what it did _not_ drop:
    the RxJS rules were never at risk, because those come from the workspace root config, not the
    project's — the first diagnosis of this was wrong. After any scripted config edit, parse every
    touched file with a duplicate-key detector, and confirm the intended rule with
    `eslint --print-config`.
11. **`nx migrate --run-migrations` does not run your Nx.** It downloads `nx@latest` into a temp
    directory and shells out to that. From Phase 8 `latest` is Nx 23 while the phase is migrating
    to Nx 21, and the mismatched CLI rejects the arguments and prints its usage text — which the
    outer process reports as an opaque `Command failed` with `stdout: null, stderr: null`. All 24
    migrations "failed" identically and changed nothing. Set `NX_MIGRATE_USE_LOCAL=true` to run the
    pinned CLI. This gets worse every phase, because `latest` keeps moving away from the version
    being migrated to.
12. **Pass `--run-migrations` a workspace-relative path.** Nx joins it onto the workspace root, so
    an absolute `/tmp/...` path resolves to `<root>/tmp/...`, which does not exist. It does not
    report a missing file — it prints the `migrate` usage text and exits 1, identical to rule 11's
    symptom. Earlier phases used `/tmp` paths successfully, so this changed in Nx 21.
13. **Check `df` before blaming the toolchain.** A first Node 22 baseline failed
    `plopdown-ext:build` and `website:build` with `ENOSPC: no space left on device`, which reads
    exactly like a Node-version regression until you look. The session's writable allowance is
    fixed, so `df` shows `Avail` near zero against a low `Used`; `dist/`, `docs/` and `.nx/cache`
    are all regenerable and clearing them recovers several GB. Note also that a gate run _without_
    `--skip-nx-cache` will happily replay cached results from a previous Node version and report
    green — the Phase 7 gate looked clean on Node 22 for exactly that reason.
14. **A migration's `optional` flag is per-version, not permanent.** `control-flow-migration` is
    `optional: true` under Angular 20 and not optional under Angular 21. Re-read the flag out of
    each hop's own `migrations.json` rather than carrying forward what it was last phase, or
    Decision 6 gets applied to something Angular now considers mandatory.
15. **Audit what `control-flow-migration` chose for `track`.** It converts every `*ngFor` to
    `@for (x of xs; track x)`. `*ngFor` tolerated duplicate values; `@for` throws NG0955 on a
    duplicate track key at runtime. For arrays of objects, identity tracking is fine. For arrays
    of primitives it is a new crash that no build or unit test catches — here `authors: string[]`
    and `fileRefs: string[]` both got `track <item>` and were changed to `track $index`, which is
    what `*ngFor` effectively did. Check the element type of every converted collection.
16. **Angular 21 makes zone change detection opt-in.** Without `provideZoneChangeDetection()` an
    app bootstraps zoneless, `NgZone` resolves to a no-op and `ngZone.run()` stops scheduling
    change detection. `RuntimeService`, `WebNavigationService` and `ExtStorageService` all rely on
    `ngZone.run()` to re-enter Angular from extension callbacks, so losing it would leave every
    build and every unit test green while the UI silently stopped updating. Angular's
    `bootstrap-options-migration` adds the provider to all eight apps; the invariant is now pinned
    by `apps/background/src/app/zone-change-detection.spec.ts`.
17. **The flat-config migration leaves three things behind.** `convert-to-flat-config` rewrote 78
    files and none of the 25 project configs could load afterwards. It emits
    `compat.config({ extends: ['plugin:@angular-eslint/template/process-inline-templates'] })`,
    which angular-eslint 22 no longer ships in eslintrc form — every project then failed with
    "Failed to load config ... to extend from", which Nx reports as a lint _failure_, not a config
    error. `nx.configs['flat/angular']` already carries that processor, so the extends is both
    broken and redundant. It also emits `plugins: ['eslint-plugin-rxjs']` naming the old package,
    and it converted `.eslintignore` **comment lines** into ignore patterns — three lines of
    explanation silently became three globs. Read the generated config rather than assuming it
    works; a broken config and a clean lint look identical from the exit code up.
18. **Angular 22 removes `ComponentFactoryResolver`.** Deprecated since 13, gone in 22, and this
    repo had four call sites — three of them on the cue-rendering path that is the product's whole
    purpose. `ViewContainerRef.createComponent` takes a component type directly; for the
    `factory.create(injector)` shape the replacement is the standalone `createComponent()` with an
    `EnvironmentInjector`. Nothing migrates this automatically.
19. **A dependency in the upgrade list may deserve deletion instead.** Three packages the plan
    listed as "move to current" — `@ngrx/component-store`, `uuid`, `core-js` — are imported nowhere
    in the workspace. `@ngrx/component-store` would have forced a beta pin to satisfy Angular 22.
    Check whether the thing is used before working out how to upgrade it.

## 0. Ahead of Phase 0 — Remove the web-extension plugin (done)

- [x] 0.1 Replace `plopdown-ext`'s `build`/`serve` builders with `@nrwl/workspace:run-commands`
      invoking `web-ext` directly, plus `tools/scripts/copy-ext-assets.js` for the asset copy the
      old builder did via `fs-extra`
- [x] 0.2 Delete `libs/web-extension` and `apps/web-extension-e2e`, and drop both from
      `angular.json`, `nx.json`, `tsconfig.base.json`, and `jest.config.js`
- [x] 0.3 Remove the "Build Web Extension Plugin" step from `pull_requests.yml`
- [x] 0.4 Update `README.md`, `REVIEWERS.md`, and `CLAUDE.md` to drop the bootstrap step
- [x] 0.5 Verify `nx build plopdown-ext` produces `dist/extensions/plopdown_video-<version>.zip`
      with no `dist/libs/web-extension` present

## 1. Phase 0 — Baseline and lockfile (Node 16, no version changes)

- [x] 1.1 Record a pre-upgrade baseline on Node 12: run build, test, and lint, and write down what
      already fails so pre-existing breakage is never mistaken for upgrade breakage
- [x] 1.2 Install Node 16 and confirm Angular 12 + Nx 12 build, test, and lint unchanged under it
- [x] 1.3 Set `.nvmrc` to `lts/gallium` (Node 16)
- [x] 1.4 Migrate `package-lock.json` in place — run `npm install` with npm 8 against the existing
      v1 file. Do **not** delete and regenerate: a from-scratch resolve re-resolves every `^` range
      to today's newest match and silently bumps hundreds of transitive versions, which is exactly
      the unreviewable diff Decision 3 exists to prevent. In-place migration changed 1 of 1633
      entries. Target is `lockfileVersion` **2**, not 3 — npm 8 writes v2, and v3 only arrives with
      npm 9. v2 is the better landing anyway: it keeps the legacy `dependencies` block alongside
      `packages`, so npm 6 can still read it during the transition
- [x] 1.5 Pin `eslint-plugin-rxjs` off `latest` to `3.3.5`, the version the old lockfile actually
      resolved. This is load-bearing, not tidying: `latest` now means 5.0.3, which peer-requires
      eslint ^8 against this repo's ^7, and npm 8 fails the whole install with ERESOLVE where npm 6
      silently allowed it. Replace the `json-schema` git URL with `0.4.0`, the registry release of
      that same fork commit (the CVE-2021-3918 fix). Note this only pins the direct devDependency —
      transitive consumers can still nest older copies, which needs `overrides` to fix properly;
      file that rather than doing it here
- [x] 1.6 Drop `@nrwl/nx-plugin`, now dead — the removed plugin was its only consumer, and it is
      referenced nowhere outside `package.json`. Doing it here keeps the lockfile churn in one PR
- [x] 1.6c Declare `ajv` as a direct dependency (`^8.6.0`). The checked-in, bundled
      `libs/plopdown-file/src/schema/plopdown-file-v1.schema.js` calls
      `require('ajv/dist/runtime/ucs2length')` and `.../equal` — ajv 8 paths — but `ajv` is declared
      nowhere in `package.json`. It has only ever worked because npm 6 happened to hoist ajv 8.6.0,
      a transitive of `ajv-cli`, to the root. npm 8 hoists ajv 6.15.0 there instead, ajv 6 has no
      `dist/runtime/`, and six projects fail to build or test. A latent bug the migration exposed
      rather than caused; declaring the dependency removes the reliance on hoisting luck
- [x] 1.6b Add an `overrides` entry pinning `node-notifier` to `9.0.1`. npm 8 hoists optional
      dependencies without respecting their range: it picked 10.0.1, which satisfies neither
      `web-ext`'s `^6` nor `jest@27`'s `^8 || ^9`, producing a lockfile that npm's own `npm ci`
      rejects with EUSAGE while `npm install` accepts it. Confirmed introduced by the migration —
      master's v1 lockfile passes the same check. Verify with `npm ci --dry-run`: under `--dry-run`
      it still exits 127 because `ngcc` was never installed, which is expected and matches the
      control; what matters is that no EUSAGE line appears
- [x] 1.7 Raise Node to `16.x` in CI: `env.NODE_VERSION` and the `setup` job's matrix in
      `pull_requests.yml` (both, they are separate), and the matrix in `deploy_website.yml`
- [x] 1.8 Order `plopdown-ext:build` after the six app builds. It currently packages whenever the
      task graph happens to reach it. In CI run 30711789615 it wrote the zip at 18:09:56.1, and
      `background:build:production` only started at 18:09:56.2 and finished at 18:10:18 — so the
      archive held just `content-script`, `devtool`, `devtool-panels`, `icons`, `_locales`, and
      `manifest.json`, missing `background`, `browser-action`, and `options`. A manifest pointing
      at an absent `background/main.js` will not load in Firefox. `implicitDependencies` in
      `nx.json` drives affected-detection, not ordering — add `targetDependencies` so `build`
      waits on its dependencies' `build`. Pre-existing: ordering is a task-graph property, so the
      removed plugin packaged just as early
- [x] 1.9 Confirm the fix by unzipping the CI artifact and checking all six surfaces are present.
      Until this passes, a green `Build Affected` does not mean the extension is loadable, and the
      Decision 7 gate is not actually being enforced
- [x] 1.10 Verify the Decision 7 gate
- [x] 1.11 Open the PR, pause for review

## 2. Phase 1 — Angular/Nx 13 (Node 16)

- [x] 2.1 Run `nx migrate 13` and apply `migrations.json` one entry at a time, not as a batch
- [x] 2.2 Move TypeScript to 4.6.x and resolve the compiler errors it surfaces
- [x] 2.3 Rewrite `tools/webpack/content-script-webpack.config.js` for webpack 5 — this breaks at
      this hop, not later
- [x] 2.4 Confirm `@angular-builders/custom-webpack` 13.x drives the content-script build
- [x] 2.5 Decline every optional schematic Angular offers (Decision 6); note what was declined
- [x] 2.6 Verify the gate
- [x] 2.7 Open the PR, pause for review

## 3. Phase 2 — Angular/Nx 14 (Node 16)

- [x] 3.1 Run `nx migrate 14`, apply migrations individually
- [x] 3.2 Move TypeScript to 4.8.x
- [x] 3.3 Verify the gate; open the PR, pause for review

## 4. Phase 3 — Angular/Nx 15 (Node 16)

- [x] 4.1 Run `nx migrate 15`, apply migrations individually
- [x] 4.2 Move TypeScript to 4.9.x
- [x] 4.3 Verify the gate; open the PR, pause for review

## 5. Phase 4 — Angular/Nx 16 (Node 18) — heaviest phase

- [x] 5.1 Raise Node to 18, `.nvmrc` and both CI workflows together
- [x] 5.2 Run `nx migrate 16`; expect codemods to fail on a workspace this old and hand-apply what
      throws
- [x] 5.3 Complete the `@nrwl/*` → `@nx/*` rename across `package.json`, `angular.json`, `nx.json`,
      and every import
- [x] 5.4 Remove the `ngcc` and `decorate-angular-cli.js` postinstall steps; delete
      `decorate-angular-cli.js`
- [x] 5.5 Split projects out of `angular.json` into per-project `project.json`
- [x] 5.6 Replace the hardcoded 29-project `projects` array in `jest.config.js` with Nx inference
- [x] 5.7 Confirm `nx migrate` renamed `@nrwl/workspace:run-commands` to `nx:run-commands` on the
      `plopdown-ext` build and serve targets (the plugin itself was removed ahead of Phase 0)
- [x] 5.8 Move TypeScript to 5.1.x
- [x] 5.9 Verify the gate — the extension must still produce a complete zip before this merges
- [x] 5.10 Open the PR, pause for review

## 6. Phase 5 — Angular/Nx 17 (Node 18)

- [x] 6.1 Run `nx migrate 17`, apply migrations individually
- [x] 6.2 Move TypeScript to 5.4.x
- [x] 6.3 Decline the standalone-components and control-flow migrations (Decision 6)
- [x] 6.4 Verify the gate; open the PR, pause for review

## 7. Phase 6 — Angular/Nx 18 and RxJS 7 (Node 18)

- [x] 7.1 Run `nx migrate 18`, apply migrations individually; move TypeScript to 5.5.x
- [x] 7.2 Move RxJS 6.6 → 7.8 in its own commit, separate from the framework hop
- [x] 7.3 Audit `PortPublisher` and `PortSubscriber` against RxJS 7's changed `share` semantics —
      the bus fans out over `runtime.sendMessage` and `tabs.sendMessage` and depends on this
- [x] 7.4 Audit every background feature component's pipeline for `combineLatest`, `toPromise`, and
      subscription-timing changes
- [x] 7.5 ESLint 9, flat config and the `@smarttools` swap are **not** done here — moved to
      Phase 10. Checked rather than assumed: `angular-eslint` 18 through 21 and `@nx/eslint` 20
      through 22 all accept `eslint ^8.57.0 || ^9.0.0`. ESLint 8 is only dropped by
      `angular-eslint` 22 and `@nx/eslint` 23, which is exactly Phase 10. Doing it here would be an
      optional change, which Decision 6 declines
- [x] 7.8 Add automated coverage for the message bus before moving RxJS, since manual checking is
      deferred to close-out and nothing else catches a silent delivery failure: a spec that
      publishes through `BackgroundPubService` and asserts the matching `filterCommand` observable
      actually emits, covering both the `runtime.sendMessage` and `tabs.sendMessage` fan-out
- [x] 7.9 Verify the gate
- [x] 7.10 Open the PR, pause for review

## 8. Phase 7 — Angular/Nx 19 (Node 18)

- [x] 8.1 Run `nx migrate 19`, apply migrations individually
- [x] 8.2 Move TypeScript to 5.8.x
- [x] 8.3 Verify the gate; open the PR, pause for review

## 9. Phase 8 — Angular 20 / Nx 21 (Node 22)

- [x] 9.1 Raise Node to 22, `.nvmrc` and both CI workflows together
- [x] 9.2 Run `nx migrate`; Nx and Angular majors diverge from here, so let the migration resolve
      the pairing rather than pinning by hand — it settled on Nx 21.6.9 with Angular 20.3.9
- [x] 9.3 Move TypeScript to 5.9.x — the migration did this itself, landing on 5.9.3
- [x] 9.3a Bump the two framework-coupled packages `nx migrate` does not know about:
      `@angular-builders/custom-webpack` (peer-requires `@angular-devkit/build-angular` ^19, which
      fails the install outright) and `@ngrx/component-store`
- [x] 9.3b Drop Cypress entirely at the owner's instruction: delete `apps/plopdown-embed-e2e`,
      remove `cypress`, `@nx/cypress` and `eslint-plugin-cypress`, the `e2e` and `affected:e2e`
      scripts, the `e2e` entry in `targetDefaults`, and the `e2eTestRunner` generator default
- [x] 9.4 Verify the gate; open the PR, pause for review

## 10. Phase 9 — Angular 21 / Nx 22 (Node 22)

- [x] 10.1 Run `nx migrate`, apply migrations individually — Nx 22.7.8 with Angular 21.2.9
- [x] 10.1a Bump the framework-coupled packages `nx migrate` does not track:
      `@angular-builders/custom-webpack` and `@ngrx/component-store` (the latter peer-requires
      `@angular/core` ^20 and fails the install)
- [x] 10.1b Run `@angular/core:control-flow-migration`. It is **not** optional at this hop —
      Angular 20 flagged it `optional: true`, Angular 21 does not — so Decision 6 does not apply.
      It rewrote 31 templates and left zero `*ngIf`/`*ngFor`/`*ngSwitch` in the workspace.
      Audit its `track` expressions afterwards (see rule 15)
- [x] 10.1c Repair `test-setup.ts` in all 25 projects. `update-jest-preset-angular-setup` swaps
      `import 'jest-preset-angular/setup-jest'` for `setupZoneTestEnv()` but leaves the repo's
      hand-written `initTestEnvironment` block in place, so the environment is initialised twice
      and every suite fails with `NG0400: A platform with a different configuration has been
  created`. `setupZoneTestEnv` takes the same `TestEnvironmentOptions`, so the fix is to pass
      `{ teardown: { destroyAfterEach: false } }` to it and delete the hand-written block
- [x] 10.1d Make `IconComponent.iconClass` public. Angular 21 compiles host bindings outside the
      class body, so a `private` field behind `@HostBinding` now fails with TS2341
- [x] 10.2 Verify the gate; open the PR, pause for review

## 11. Phase 10 — Angular 22 / Nx 23 (Node 24)

- [x] 11.1 Raise Node to 24, `.nvmrc` and both CI workflows together. The floor is **24.15**, not
      any 24: `@angular/build` declares `node: ^22.22.3 || ^24.15.0 || >=26.0.0` and warns
      EBADENGINE below it. CI's `24.x` resolves above the floor on its own
- [x] 11.2 Run `nx migrate latest` — landed on Angular 22.0.8 / Nx 23.1.1, 34 migrations applied
      individually
- [x] 11.3 Move TypeScript to 6.0.x — forced, not optional: `@angular/compiler-cli` 22 peers
      `typescript >=6.0 <6.1`. Landed on 6.0.3
- [x] 11.3a Drop `baseUrl` from `tsconfig.base.json`. TS 6 errors on it (TS5101, deprecated and
      removed in TS 7). Removing it alone breaks every `paths` entry with TS5090, because
      non-relative path targets are only legal when `baseUrl` is set — so all 33 path values are
      now `./`-prefixed. The alternative, `"ignoreDeprecations": "6.0"`, only defers this to TS 7
- [x] 11.4 Move zone.js to 0.16.x and `@angular/cdk` to 22.x — zone.js 0.16.2 arrived with the
      Nx 22 migration in Phase 9; the CDK moved to 22.0.7 here
- [x] 11.5 Move Jest to 30 and `jest-preset-angular` to current; update the `ts-jest` transform in
      `jest.preset.js` — done early: the Nx 22 migration carried Jest 29.7 → 30.4.2,
      `jest-preset-angular` 14.6.2 → 16.0.0, `jest-environment-jsdom` and `@types/jest` with it.
      Confirm at Phase 10 whether the `ts-jest` transform entry is still doing anything
- [x] 11.6 ~~Move Cypress 4 → 15 and convert `apps/plopdown-embed-e2e/cypress.json` to
      `cypress.config.ts`~~ — obsolete. Cypress was dropped entirely in Phase 8 at the owner's
      instruction. `apps/plopdown-embed-e2e` pointed its `devServerTarget` at
      `plopdown-embed:storybook`, a target that does not exist on that library, so the four specs
      had been unrunnable for as long as the project has had `project.json` files
- [x] 11.7 Move the remaining runtime dependencies. Moved: `pouchdb` and `pouchdb-find` 7.2.2 → 9,
      `webextension-polyfill` 0.8 → 0.12, `web-ext` 4.3 → 10.5, `addons-linter` 1.26 → 10.9,
      `lz-string` 1.4.4 → 1.5, `reflect-metadata` 0.1.13 → 0.2.2. Bulma held at 0.9 as planned.
      Two departures from the list: - `@ngrx/component-store` was **removed**, not moved. It is imported nowhere in `apps/` or
      `libs/`, and its latest stable (21.1.1) peers `@angular/core ^21` — only a 22 beta exists.
      Pinning a beta for a dependency nothing imports would be strictly worse than deleting it - `plyr` is **held at 3.6.8**. 3.8.4 added an `exports` map, so the sass import has to become
      `plyr/plyr.scss`, and its `.d.ts` ships both `export = Plyr` and `export default Plyr`.
      That combination gives TS1192 on a default import and TS2351 on a namespace import, and
      `esModuleInterop` does not resolve it. Held for the same reason as Bulma: a website-only
      dependency is not worth an interop workaround in an upgrade PR
- [x] 11.7a Remove `uuid`, `@types/uuid` and `core-js`. Both were in the plan as upgrades; neither
      is imported anywhere in the workspace, so they are dead weight rather than upgrade work
- [x] 11.8 Drop dead devDependencies the migration leaves behind — `react`, `react-is`,
      `web-ext-types`. There was no `tslint.json` and no `nx.json` entry for one; that part of the
      task described a state the repo had already left
- [x] 11.9 Remove the `typescript-tslint-plugin` entry from `tsconfig.base.json`
- [x] 11.9a Move ESLint 8 → 9 and `.eslintrc.json` → flat config. Forced here and only here:
      `angular-eslint` 22 and `@nx/eslint` 23 drop `^8`. `@nx/eslint:update-23-1-0-convert-to-flat-config`
      does the bulk (78 files), but leaves three things behind — see rule 17
- [x] 11.9b Replace `eslint-plugin-rxjs` with `@smarttools/eslint-plugin-rxjs` (1.0.22). The original pin
      peers `eslint ^8.0.0` and cannot follow to 9. Note the repo has already moved this plugin
      once — Phase 1 took it 3.3.5 → 5.0.3 for ESLint 8 — so Decision 5's description of it as
      stuck at 3.3.5 is out of date
- [x] 11.9c Confirm the RxJS rules still fire: introduce a nested `subscribe` and verify
      `rxjs/no-nested-subscribe` rejects it. A plugin that loads but enforces nothing is
      indistinguishable from success without this probe. Done, and it earned its keep — the first
      run of the probe reported nothing at all, because the config was failing to load rather than
      passing
- [x] 11.9d Replace the four `@typescript-eslint/ban-types` disable comments in
      `libs/pouchdb/src/lib/pouchdb.service.ts`. typescript-eslint 8 split that rule up, so the
      comments now name a rule that does not exist — reported as four hard errors — while the
      replacement rule `no-empty-object-type` fires on the `extends {}` constraints underneath
- [x] 11.9e Replace the four `ComponentFactoryResolver` call sites. Angular 22 removed the API
      (deprecated since 13): `CueRendererComponent`, `VideoAttachmentComponent`,
      `CueTimelineComponent` and the website's `HomeComponent`. The first now passes a component
      type straight to `ViewContainerRef.createComponent`; the other three use the standalone
      `createComponent()` with an injected `EnvironmentInjector`. This is the largest hand-written
      source change of the whole upgrade and it is squarely on the cue-rendering path
- [x] 11.9f Make the sass import in `track-selector.component.scss` relative. It was the only
      stylesheet in the workspace importing via a workspace-root-relative path
      (`apps/options/src/variables.scss`), which Angular 22's sass resolution no longer finds
- [x] 11.10 Verify the gate
- [x] 11.11 Open the PR, pause for review

## 12. Manual validation (owner, after Phase 10)

Deferred here at the owner's direction rather than run per phase. CI covers build, lint, and unit
tests; none of it proves the extension works in a browser, so this group is the first time that is
checked. If something here fails, the cause could sit anywhere across eleven phases — start by
bisecting the phase merges on `master`.

- [ ] 12.1 Load the built extension in Firefox via `npm run start:ext-browser`
- [ ] 12.2 Grant origin permission on a site with an HTML5 video and confirm the content script is
      injected only after the grant
- [ ] 12.3 Attach a track to a video and confirm cues render over it at the right times
- [ ] 12.4 Confirm the browser-action popup reflects live status — this is the message bus working
      end to end, and the thing RxJS 7 is most likely to have broken silently
- [ ] 12.5 Exercise the options page: add a remote, toggle its `sync` flag, confirm replication
      direction still follows it
- [ ] 12.6 Open a `#plopdown:<compressed>` share URL and confirm it decodes to an ephemeral
      VideoRef and Track
- [ ] 12.7 Confirm the extension enable/disable toggle still tears the background pipelines down

## 13. Close-out

- [x] 13.1 Update `CLAUDE.md` — the Node / lockfileVersion note, the `ngcc` postinstall line, the
      `npm test` and `npm run lint` descriptions, the four-file registration convention (now
      `project.json` plus `tsconfig.base.json`; no root `angular.json`, Jest projects inferred),
      the RxJS plugin name, and new notes on flat config and the deliberately-disabled rules
- [x] 13.2 Update `README.md` setup and development steps — Node 24.15 floor, `npm ci`
- [x] 13.3 Update `REVIEWERS.md` — it told Mozilla's add-on reviewers to reproduce the build on
      `node:12` with npm 6.14.11. Now `node:24` (24.15+, npm 11) and `npm ci`
- [x] 13.4 Confirm the extension version is still in sync between `package.json` and
      `apps/plopdown-ext/src/manifest.json` — both 0.0.11, unchanged throughout
- [x] 13.5 File follow-ups deliberately excluded here: - **Manifest V3.** Untouched; the extension is still MV2 - **Bulma 1.x.** Held at 0.9.3 by design - **`plyr` 3.8.** Held at 3.6.8; see task 11.7 for the interop reason - **Accessibility.** `label-has-associated-control` (19),
      `click-events-have-key-events` (12) and `interactive-supports-focus` (10) are switched off
      per project. These are real findings on pre-existing markup, not noise - **`ChangeDetectionStrategy.Eager` on 45 components.** Angular 22's
      `change-detection-eager` migration wrote it everywhere to preserve behaviour;
      `prefer-on-push-component-change-detection` is off until someone does that pass - **Standalone components and `inject()`.** `prefer-standalone` and `prefer-inject` are off
      across the workspace - **`@Output()` names in `apps/options`.** `no-output-native` is off for eight pre-existing
      `cancel`/`save` outputs - **The devtool and testing-sandbox questions**, and any pre-existing bugs from task 1.1
