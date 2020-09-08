---
title: Plopdown Firefox Alpha Released
created: 2020-11-17T12:51:33.173Z
slug: permissions-manager
author: Spaceribs
tags:
  - Release
excerpt: |
  One of the core principals of Plopdown will always be that this extension will
  provide you the reigns of what it has access to. We provide minimal permissions
  and it's up to you to open permissions up to specific websites and features
  within the extension.
---

## Permissions Manager

One of the core principals of Plopdown will always be that this extension will
provide you the reigns of what it has access to. We provide minimal permissions
and it's up to you to open permissions up to specific websites and features
within the extension.

In accordance with that viewpoint, we don't request the `tabs` permission, or
even the `activeTabs` permission. When clicking the extension button on a page
that you haven't given previous access to, you will be requested to allow
this domain explicitly.

The reason for this is twofold:

- `tabs` permission doesn't provide granular access.
- `activeTabs` permission messes with permissions in such a way as
  to make it impossible to determine what is temporary and what is persistent.

Unfortunately due to even more limitations in the web extension API, we now require
the following permission:

- `webNavigation` permission allows us to get the url of the current tab.
  With this information, we can do the following:
  - Get the origin of the site to request permissions on.
  - Detect `#plopdown:` tracks and prompt if there are any issues initializing
    plopdown on the targeted page. More on this feature below.

For the last couple of months I've been weaving my way through this major
change in approach. Now that it's accomplished I'll be releasing much more
bite sized changes and updating this blog more.

## Link Sharing

The next core feature we'll be rolling out is link sharing. The goal is that
you should be able to send a friend a link to your video as well as display a
Plopdown on that video automatically. This is by far the #1 use-case we want
to support, the ability for non-technical users to annotate and critique
existing video content outside the boundaries of the creator.

You can test this feature by going to the new permissions manager, giving
permission to YouTube, and clicking the test tube icon to automatically
redirect and initialize a testing plopdown track.

These special tracks are stored temporarily within the URL in a compressed
format as part of the hash. The links themselves look something
like the following:

```md
https://www.netflix.com/watch/80018586#plopdown:OoUQQga...pr-KC-ogA
```

Big shout out to @whytheplatypus for getting this feature up and running,
and becoming one of our first contributors!
