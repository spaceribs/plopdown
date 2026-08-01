## Why

The workspace is pinned to Node 12, Nx 12.5.7, and Angular 12.1.1 — all end-of-life since 2022,
and Node 12 since April 2022. Nothing in the toolchain receives security patches, `npm ci` runs on
npm 6 with a lockfileVersion 1 lockfile, and the pinned `eslint-plugin-rxjs` was last published in
June 2023. The immediate trigger is that CI has already started failing on retired GitHub Actions;
the runner images, and eventually the Node 12 binaries themselves, will keep eroding underneath a
workspace that cannot be built on any currently-supported runtime.

## What Changes

Ten Angular majors, eleven Nx majors, and four Node steps, applied one major at a time with a
verifiable green state and a review pause at each stop.

- **BREAKING** Node 12 → 24, raised only when a hop demands it: 12 → 16 → 18 → 22 → 24. `.nvmrc`
  and the CI `node-version` matrix move in lockstep with each hop.
- **BREAKING** `package-lock.json` regenerates from lockfileVersion 1 (npm 6) to the current
  format. This is a whole-file diff and lands alone, before any framework change.
- **BREAKING** Angular 12.1.1 → 22.1.0 and Nx 12.5.7 → 23.1.1 via chained `nx migrate` hops.
  Carries TypeScript 4.2 → 6.0, RxJS 6.6 → 7.8, and zone.js 0.11 → 0.16.
- **BREAKING** The `@nrwl/*` packages become `@nx/*` (Nx 16), and projects move out of
  `angular.json` into per-project `project.json`. The hardcoded 29-project `projects` array in
  `jest.config.js` is replaced by Nx inference.
- **BREAKING** The local `libs/web-extension` Nx plugin is ported from `@nrwl/node:package` and
  `builders.json` to modern Nx executors. Nothing in the extension builds until this compiles.
- **BREAKING** ESLint 7 + `.eslintrc.json` → ESLint 9/10 flat config. `eslint-plugin-rxjs` is
  unmaintained and does not support flat config; it is replaced by the maintained fork
  `@smarttools/eslint-plugin-rxjs`, preserving the existing RxJS rule set.
- The `ngcc` and `decorate-angular-cli.js` postinstall steps are removed (ngcc no longer exists as
  of Angular 16).
- `apps/content-script`'s custom webpack config is rewritten for webpack 5.
- Jest 27 → 30, Cypress 4 → 15 (`cypress.json` → `cypress.config.ts`), and the remaining runtime
  dependencies (`@angular/cdk`, `@ngrx/component-store`, `pouchdb`, `uuid`, `core-js`, `bulma`,
  `plyr`) move to current majors.
- `json-schema` (a git URL) and `eslint-plugin-rxjs` (`latest`) get real version pins.

## Capabilities

### New Capabilities

None. This change alters build tooling and dependency versions only.

### Modified Capabilities

None. No capability requirement changes — the extension's observable behaviour is intended to be
byte-for-byte unchanged at every stop. `skip_specs: true` is set in `.openspec.yaml` accordingly.

## Impact

**Every project in the workspace.** All 29 Nx projects rebuild against new framework majors.

- **Highest risk — `libs/web-extension`.** It is first-party Nx plugin code, and `plopdown-ext`
  consumes its builders through the unusual path `./dist/libs/web-extension:build`. Until it is
  ported and compiled, no extension surface can be packaged. It gates its own phase.
- **RxJS 7 across the message bus.** `@plopdown/messages` and every background feature component
  run long-lived pipelines built on the `PortPublisher`/`PortSubscriber` abstractions. RxJS 7
  changes `share`, `combineLatest`, and `toPromise` semantics; regressions here are silent —
  messages simply stop arriving — and unit tests may not catch them.
- **Build config**: `angular.json`, `nx.json`, `tsconfig.base.json`, `jest.config.js`,
  `.eslintrc.json`, `tools/webpack/content-script-webpack.config.js`, both `.github/workflows`
  files, `.nvmrc`, `package.json`, `package-lock.json`.
- **CI**: `ci:lint` / `ci:build` / `ci:test` run `nx affected` against `master`. Every phase
  touches root-level implicit dependencies, so each PR will rebuild and retest all projects.
- **Extension release**: the version in `package.json` and `apps/plopdown-ext/src/manifest.json`
  must stay in sync; `manifest.json` contains `//` comments and is not `JSON.parse`-able by tools
  that assume strict JSON.

**Explicit non-goal — Manifest V2 → V3.** Firefox still supports MV2. MV3 replaces the persistent
background page with a service worker, which would invalidate the headless-Angular-component
architecture in `apps/background` entirely. That is a separate change, tracked as follow-up work,
and must not be folded into this upgrade.
