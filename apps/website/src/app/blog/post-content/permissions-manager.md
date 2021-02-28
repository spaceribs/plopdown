---
title: v0.6 - Permissions Manager
created: 2021-02-28T19:15:31.104Z
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

- the `tabs` permission doesn't provide granular access.
- the `activeTabs` permission messes with permissions in such a way as
  to make it impossible to determine what is temporary and what is persistent.

Unfortunately due to even more limitations in the web extension API, we now require
the following permission:

- `webNavigation` permission allows us to get the url of the current tab.
  With this information, we can do the following:
  - Get the origin of the site to request permissions on.
  - Detect `#plopdown:` tracks and prompt if there are any issues initializing
    plopdown on the targeted page (More on this feature below).

We don't persist your URLs anywhere, and only check the active tab's URL for access
when the extension button is clicked. I'm hoping that we can migrate this behavior
to a better solution in the future and completely get rid of the `webNavigation`
permission, but for the time being this seems effective.

The list of websites the plopdown extension is allowed to access can be displayed
in the extension popup menu:

![Permissions Popup](/assets/blog-content/permissions-popup.png)

and can be managed in the extension options menu:

![Permissions Manager](/assets/blog-content/permissions-page.png)

For the last couple of months I've been weaving my way through this major
change in approach. Now that it's accomplished I'll be releasing much more
bite sized changes and updating this blog with new features as they become
available.

## Link Sharing

The next core feature we'll be rolling out is link sharing. The goal is that
you should be able to send a friend a link to your video as well as display a
Plopdown on that video automatically. This is by far the #1 use-case we want
to support, the ability for non-technical users to annotate and critique
existing video content outside the boundaries of the creator.

You can test this feature by going to the new permissions manager, giving
permission to YouTube, and clicking the test tube icon to automatically
redirect and initialize a testing plopdown track.

![Test Permissions Icon](/assets/blog-content/testtube.png)

These special tracks are stored temporarily within the URL in a compressed
format as part of the hash. The links themselves look something
like the following:

```md
https://www.netflix.com/watch/80018586#plopdown:OoUQQga...pr-KC-ogA
```

Big shout out to [@whytheplatypus](https://github.com/whytheplatypus) for getting
this feature up and running, and becoming one of our first contributors!

## First Big Refactor

This new permissions model also revealed some architectural issues with my initial
approach, and will probably result with more refactors in the future. The majority
of these issues in approach were due to properly organizing "where" the logic
for the permissions and track initialization should occur while purposefully not
breaking the existing website.

These refactors were large enough to force me to perform our first version bump, but
as we're still in alpha hopefully the impact should be negligible. If you do have
any issues, let me know: <https://github.com/spaceribs/plopdown/issues>.

## MIT -> AGPLv3

Usually the type of code I create and post are libraries, rather than products. Due
to this, I defaulted to the MIT license without thinking of the implications. Before
I ask the community for more contributions, I'd like to make it clear that the spec
is owned by the community and cannot be copied wholesale without limitations.

The AGPLv3 (nicknamed the Amazon GPL) should provide enough limitations to at least
give a larger corporation some pause before trying to claim or implement a serious
level of ownership over what this extension does.

Thanks, and have a nice day! :)
