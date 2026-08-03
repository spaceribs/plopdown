# ![Plopdown Logo](apps/plopdown-ext/src/icons/38.png) [Plopdown](https://plopdown.video)

**The Video Enhancing Web Extension**

---

## Overview

This [nx monorepo](https://nx.dev/angular) contains every and all associated plopdown.video applications
and components.

This project is currently in alpha.

## Apps

| App Name                                | Category       | Purpose                                                                   |
| --------------------------------------- | -------------- | ------------------------------------------------------------------------- |
| [website](apps/website)                 | plopdown.video | Promotional page and primary website                                      |
| [content-script](apps/content-script)   | extension      | Find and attach to video elements found in the page                       |
| [browser-action](apps/browser-action)   | extension      | Activate extension and select videos for attaching tracks                 |
| [background](apps/background)           | extension      | Install and Listen to content scripts and forward to browser action popup |
| [options](apps/options)                 | extension      | Configure global options and manage permissions                           |
| [devtool](apps/devtool)                 | extension      | The app for showing the devtool (currently disabled)                      |
| [devtool-panels](apps/devtool)          | extension      | The panels app underlying the devtool                                     |
| [plopdown-ext](apps/plopdown-ext)       | extension      | Manifest.json and static assets for the extension                         |
| [testing-sandbox](apps/testing-sandbox) | experiments    | Test out different kinds of video elements and embeds                     |

## Setup

Toolchain versions are pinned in [`.prototools`](.prototools) and managed with
[proto](https://moonrepo.dev/proto) — currently Node 24.19.0 and npm 11.17.0. `@angular/build`
refuses to run below Node 24.15, so that is the floor rather than a preference.

[Install proto](https://moonrepo.dev/docs/proto/install) once, then from the repo root:

```bash
$ proto use
$ npm ci
```

`proto use` reads `.prototools` and installs the pinned versions. If you would rather not use
proto, install Node 24.19.0 and npm 11.17.0 by whatever means you prefer — nothing in the build
depends on proto itself.

## Development

Please refer to <https://nx.dev/angular/cli/overview> for a complete guide in developing and deploying this monorepo.

To start the extension in development mode, run the following commands in different terminals:

```bash
$ npm run start:ext

>  NX  Running target build for projects:

  - browser-action
  - content-script
  - background
  - devtool
  - devtool-panels
  - options

  With flags:
    --watch=true
```

```bash
$ npm run start:ext-browser

Running web extension from /.../plopdown-nx/dist/apps/plopdown-ext
Use --verbose or open Tools > Web Developer > Browser Console to see logging
Installed /.../plopdown-nx/dist/apps/plopdown-ext as a temporary add-on
The extension will reload if any source file changes
Press R to reload (and Ctrl-C to quit)
```

This will create a temporary Firefox instance and rebuild any components you edit.

## Deployment

Build all applications using the following command

```bash
$ npm run build:ext

...

>  NX   SUCCESS  Running target "build" succeeded
```

The website will be built in the `/docs` folder, and the extension
will be packed as a zip in the `dist/extensions` folder.
