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

Install packages:

```bash
$ npm install

added 3116 packages from 1258 contributors and audited 3397 packages in 849.968s
```

Build the web-extension nx plugin:

```bash
$ npm run build web-extension

Compiling TypeScript files for library web-extension...
Done compiling TypeScript files for library web-extension
Copying asset files...
Done copying asset files.
```

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
