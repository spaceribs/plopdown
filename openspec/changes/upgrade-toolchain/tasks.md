Each numbered group is one PR and one review pause. A group is done only when the Decision 7 gate
passes: `npm run build:ext`, `npm run build plopdown-ext`, `npm test`, and `npm run lint` all
succeed, with `.nvmrc` and both CI workflows on the group's Node version.

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

- [ ] 1.1 Record a pre-upgrade baseline on Node 12: run build, test, and lint, and write down what
      already fails so pre-existing breakage is never mistaken for upgrade breakage
- [ ] 1.2 Install Node 16 and confirm Angular 12 + Nx 12 build, test, and lint unchanged under it
- [ ] 1.3 Set `.nvmrc` to `lts/gallium` (Node 16)
- [ ] 1.4 Migrate `package-lock.json` in place — run `npm install` with npm 8 against the existing
      v1 file. Do **not** delete and regenerate: a from-scratch resolve re-resolves every `^` range
      to today's newest match and silently bumps hundreds of transitive versions, which is exactly
      the unreviewable diff Decision 3 exists to prevent. In-place migration changed 1 of 1633
      entries. Target is `lockfileVersion` **2**, not 3 — npm 8 writes v2, and v3 only arrives with
      npm 9. v2 is the better landing anyway: it keeps the legacy `dependencies` block alongside
      `packages`, so npm 6 can still read it during the transition
- [ ] 1.5 Pin `eslint-plugin-rxjs` off `latest` to `3.3.5`, the version the old lockfile actually
      resolved. This is load-bearing, not tidying: `latest` now means 5.0.3, which peer-requires
      eslint ^8 against this repo's ^7, and npm 8 fails the whole install with ERESOLVE where npm 6
      silently allowed it. Replace the `json-schema` git URL with `0.4.0`, the registry release of
      that same fork commit (the CVE-2021-3918 fix). Note this only pins the direct devDependency —
      transitive consumers can still nest older copies, which needs `overrides` to fix properly;
      file that rather than doing it here
- [ ] 1.6 Drop `@nrwl/nx-plugin`, now dead — the removed plugin was its only consumer, and it is
      referenced nowhere outside `package.json`. Doing it here keeps the lockfile churn in one PR
- [ ] 1.7 Raise Node to `16.x` in CI: `env.NODE_VERSION` and the `setup` job's matrix in
      `pull_requests.yml` (both, they are separate), and the matrix in `deploy_website.yml`
- [ ] 1.8 Order `plopdown-ext:build` after the six app builds. It currently packages whenever the
      task graph happens to reach it. In CI run 30711789615 it wrote the zip at 18:09:56.1, and
      `background:build:production` only started at 18:09:56.2 and finished at 18:10:18 — so the
      archive held just `content-script`, `devtool`, `devtool-panels`, `icons`, `_locales`, and
      `manifest.json`, missing `background`, `browser-action`, and `options`. A manifest pointing
      at an absent `background/main.js` will not load in Firefox. `implicitDependencies` in
      `nx.json` drives affected-detection, not ordering — add `targetDependencies` so `build`
      waits on its dependencies' `build`. Pre-existing: ordering is a task-graph property, so the
      removed plugin packaged just as early
- [ ] 1.9 Confirm the fix by unzipping the CI artifact and checking all six surfaces are present.
      Until this passes, a green `Build Affected` does not mean the extension is loadable, and the
      Decision 7 gate is not actually being enforced
- [ ] 1.10 Verify the Decision 7 gate
- [ ] 1.11 Open the PR, pause for review

## 2. Phase 1 — Angular/Nx 13 (Node 16)

- [ ] 2.1 Run `nx migrate 13` and apply `migrations.json` one entry at a time, not as a batch
- [ ] 2.2 Move TypeScript to 4.6.x and resolve the compiler errors it surfaces
- [ ] 2.3 Rewrite `tools/webpack/content-script-webpack.config.js` for webpack 5 — this breaks at
      this hop, not later
- [ ] 2.4 Confirm `@angular-builders/custom-webpack` 13.x drives the content-script build
- [ ] 2.5 Decline every optional schematic Angular offers (Decision 6); note what was declined
- [ ] 2.6 Verify the gate
- [ ] 2.7 Open the PR, pause for review

## 3. Phase 2 — Angular/Nx 14 (Node 16)

- [ ] 3.1 Run `nx migrate 14`, apply migrations individually
- [ ] 3.2 Move TypeScript to 4.8.x
- [ ] 3.3 Verify the gate; open the PR, pause for review

## 4. Phase 3 — Angular/Nx 15 (Node 16)

- [ ] 4.1 Run `nx migrate 15`, apply migrations individually
- [ ] 4.2 Move TypeScript to 4.9.x
- [ ] 4.3 Verify the gate; open the PR, pause for review

## 5. Phase 4 — Angular/Nx 16 (Node 18) — heaviest phase

- [ ] 5.1 Raise Node to 18, `.nvmrc` and both CI workflows together
- [ ] 5.2 Run `nx migrate 16`; expect codemods to fail on a workspace this old and hand-apply what
      throws
- [ ] 5.3 Complete the `@nrwl/*` → `@nx/*` rename across `package.json`, `angular.json`, `nx.json`,
      and every import
- [ ] 5.4 Remove the `ngcc` and `decorate-angular-cli.js` postinstall steps; delete
      `decorate-angular-cli.js`
- [ ] 5.5 Split projects out of `angular.json` into per-project `project.json`
- [ ] 5.6 Replace the hardcoded 29-project `projects` array in `jest.config.js` with Nx inference
- [ ] 5.7 Confirm `nx migrate` renamed `@nrwl/workspace:run-commands` to `nx:run-commands` on the
      `plopdown-ext` build and serve targets (the plugin itself was removed ahead of Phase 0)
- [ ] 5.8 Move TypeScript to 5.1.x
- [ ] 5.9 Verify the gate — the extension must still produce a complete zip before this merges
- [ ] 5.10 Open the PR, pause for review

## 6. Phase 5 — Angular/Nx 17 (Node 18)

- [ ] 6.1 Run `nx migrate 17`, apply migrations individually
- [ ] 6.2 Move TypeScript to 5.4.x
- [ ] 6.3 Decline the standalone-components and control-flow migrations (Decision 6)
- [ ] 6.4 Verify the gate; open the PR, pause for review

## 7. Phase 6 — Angular/Nx 18 and RxJS 7 (Node 18)

- [ ] 7.1 Run `nx migrate 18`, apply migrations individually; move TypeScript to 5.5.x
- [ ] 7.2 Move RxJS 6.6 → 7.8 in its own commit, separate from the framework hop
- [ ] 7.3 Audit `PortPublisher` and `PortSubscriber` against RxJS 7's changed `share` semantics —
      the bus fans out over `runtime.sendMessage` and `tabs.sendMessage` and depends on this
- [ ] 7.4 Audit every background feature component's pipeline for `combineLatest`, `toPromise`, and
      subscription-timing changes
- [ ] 7.5 Migrate `.eslintrc.json` to ESLint 9 flat config
- [ ] 7.6 Replace `eslint-plugin-rxjs` with `@smarttools/eslint-plugin-rxjs`, preserving
      `no-nested-subscribe`, `no-subject-value`, `no-unbound-methods`, and the rest of the rule set
- [ ] 7.7 Confirm the RxJS rules still fire: introduce a nested `subscribe` temporarily and verify
      lint rejects it
- [ ] 7.8 Add automated coverage for the message bus before moving RxJS, since manual checking is
      deferred to close-out and nothing else catches a silent delivery failure: a spec that
      publishes through `BackgroundPubService` and asserts the matching `filterCommand` observable
      actually emits, covering both the `runtime.sendMessage` and `tabs.sendMessage` fan-out
- [ ] 7.9 Verify the gate
- [ ] 7.10 Open the PR, pause for review

## 8. Phase 7 — Angular/Nx 19 (Node 18)

- [ ] 8.1 Run `nx migrate 19`, apply migrations individually
- [ ] 8.2 Move TypeScript to 5.8.x
- [ ] 8.3 Verify the gate; open the PR, pause for review

## 9. Phase 8 — Angular 20 / Nx 21 (Node 22)

- [ ] 9.1 Raise Node to 22, `.nvmrc` and both CI workflows together
- [ ] 9.2 Run `nx migrate`; Nx and Angular majors diverge from here, so let the migration resolve
      the pairing rather than pinning by hand
- [ ] 9.3 Move TypeScript to 5.9.x
- [ ] 9.4 Verify the gate; open the PR, pause for review

## 10. Phase 9 — Angular 21 / Nx 22 (Node 22)

- [ ] 10.1 Run `nx migrate`, apply migrations individually
- [ ] 10.2 Verify the gate; open the PR, pause for review

## 11. Phase 10 — Angular 22 / Nx 23 (Node 24)

- [ ] 11.1 Raise Node to 24, `.nvmrc` and both CI workflows together
- [ ] 11.2 Run `nx migrate latest` to Angular 22.1.0 / Nx 23.1.1
- [ ] 11.3 Move TypeScript to 6.0.x
- [ ] 11.4 Move zone.js to 0.16.x and `@angular/cdk` to 22.x
- [ ] 11.5 Move Jest to 30 and `jest-preset-angular` to current; update the `ts-jest` transform in
      `jest.preset.js`
- [ ] 11.6 Move Cypress 4 → 15 and convert `apps/plopdown-embed-e2e/cypress.json` to
      `cypress.config.ts`
- [ ] 11.7 Move the remaining runtime dependencies: `@ngrx/component-store`, `pouchdb`,
      `pouchdb-find`, `uuid`, `core-js`, `plyr`, `webextension-polyfill`, `web-ext`,
      `addons-linter`. Hold Bulma at 0.9
- [ ] 11.8 Drop dead devDependencies the migration leaves behind — `react`, `react-is`,
      `web-ext-types`, `tslint`-era config, and the `tslint.json` entry in `nx.json`
- [ ] 11.9 Remove the `typescript-tslint-plugin` entry from `tsconfig.base.json`
- [ ] 11.10 Verify the gate
- [ ] 11.11 Open the PR, pause for review

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

- [ ] 13.1 Update `CLAUDE.md` — the Node 12 / lockfileVersion 1 note, and the four-file project
      registration convention if `project.json` changed it
- [ ] 13.2 Update `README.md` setup and development steps
- [ ] 13.3 Update `REVIEWERS.md` — it tells Mozilla's add-on reviewers to reproduce the build on
      `node:12` with npm 6.14.11, which stops being true at Phase 0 and would leave AMO unable to
      verify a submission
- [ ] 13.4 Confirm the extension version is still in sync between `package.json` and
      `apps/plopdown-ext/src/manifest.json`
- [ ] 13.5 File follow-ups deliberately excluded here: Manifest V3, Bulma 1.x, the devtool and
      testing-sandbox questions, and any pre-existing bugs found from task 1.1
