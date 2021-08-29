---
title: v0.10 - Remotes Manager
created: 2021-08-29T15:42:05.382Z
slug: remotes-manager
author: Spaceribs
tags:
  - Release
excerpt: |
  Sharing and collaboration are a fundamental component to the success of Plopdown.
  If you can't easily share your creations with others, then the barriers to the
  platform (which are already high), become insurmountable.
---

## Remotes Manager

Sharing and collaboration are a fundamental component to the success of Plopdown.
If you can't easily share your creations with others, then the barriers to the
platform (which are already high), become insurmountable.

That's why i've been dedicating my time towards making a secure and seamless
way to both read from a remote database, or replicate to a read/write database.
Some work is required to make this entirely ergonomic, but this release covers
the fundamental architecture. You'll see this feature implemented in the new options
tab called "Remotes".

![Remotes Tab](/assets/blog-content/remotes-page.png)

By default, you'll see the main plopdown feed, which we'll get into more detail below.
If you click the "Add Remote" button, you'll be presented with a modal that will
let you set up your own server to synchronize against.

![Remote Editor](/assets/blog-content/remote-editor.png)

I haven't documented exactly how these remotes should be setup on the server side,
but if you want to get started with your own Plopdown server, it only requires a
CouchDB instance with `tracks` and `video-refs` databases.

![Video References Database](/assets/blog-content/server-video-refs.png)

![Track on Database](/assets/blog-content/server-tracks.png)

When changes are made to tracks or video references in the web extension, and
you've configured a remote to synchronize, all content (including attachments)
will be saved to the remote. If you have multiple users reading and writing,
under most circumstances you'll see changes to your tracks and video refs
immediately appear.

## Main Plopdown Feed

Additionally, I'd like to figure out a way towards sustainable monetization,
and feeds should provide that. Creators that wish to promote their annotations
can pay a small fee to add a track and annotation to our default feed, or pay
slightly more to get their feed added by default. If you'd like to opt out of
the main feed, you can always just remove it in the Remotes tab.

This promotion platform is quite a ways off, and I've kept the current yearly
costs extremely low, but eventually I'll need more infrastructure to grow. For
now, it will contain some experiments and tracks i've already created.

Thanks for reading, and enjoy! We'll be working on the editor next, then
finally releasing this product out of alpha and into beta.
