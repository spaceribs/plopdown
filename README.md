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
| [plopdown-ext](apps/plopdown-ext)       | extension      | Manifest.json and static assets for the extension                         |
| [testing-sandbox](apps/testing-sandbox) | experiments    | Test out different kinds of video elements and embeds                     |
