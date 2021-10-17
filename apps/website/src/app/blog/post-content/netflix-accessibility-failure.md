---
title: Netflix's new player is an open web nightmare
created: 2021-10-17T13:01:03.528Z
slug: netflix-open-web-failure
author: Spaceribs
tags:
  - Providers
excerpt: |
  A few weeks ago I noticed some positioning issues on Netflix videos.
  This happens from time to time, and was actually pretty easy to fix, but
  in testing, it appears that the changes go much deeper than I realized.
---

A few weeks ago I noticed some positioning issues on Netflix videos.
This happens from time to time, and was actually pretty easy to fix, but
in testing, it appears that the changes go much deeper than I realized.

When seeking the video to annotations in the plopdown timeline, a new
error appears:

![Netflix Error Page](/assets/blog-content/netflix-error.png)

That's pretty odd behavior! Seeking the video element shouldn't cause
an entire app to crash, yet here we are with this wonderfully vague
unexpected error. Very interesting stuff! Let's take a look at the
source code causing this error to appear:

![Netflix Error Page when Debugging](/assets/blog-content/breakpoint-error.png)

Even more interesting! Putting a breakpoint on this listener causes
the app to crash on startup. This indicates some sort of timing check
which will make debugging a bit more difficult. Lets go down to the
underlying method:

```js
f.prototype.Wib = function () {
  this.Rb.trace('seeking');
  this.eg.trace('Video element event: seeking');
  this.Qo
    ? (this.Qo.ZKb = !0)
    : (this.eg.error('unexpected seeking event'),
      k.config.uxb &&
        this.n_(u.M.Rdb, {
          rb: {
            Trace: this.JB(),
          },
        }));
};
```

Here you can see a check on `this.Qo` to allow our video to seek
to the requested position. Debugging `this.Qo` into our console
outputs the following when seeking using the normal Netflix scrubber:

```js
> this.Qo
{
  YKb: true,
  ZKb: true,
  aLb: true
}
```

while seeking via any other means returns:

```js
> this.Qo
undefined
```

These checks are actually all over the place! The UI essentially sets
private variables to true/false and validates those variables whenever
any action is taken for events that occur on the video element.

Now to be clear, this doesn't actually impact the Plopdown extension very
much, we can still add our own listeners and place/position DOM elements
however we like. What this does impact is our ability to scrub the video
in the upcoming plopdown editor, or be able to go to specific annotations
in the timeline. That's all broken, and I think the only thing I can
do in this situation is tell people where the annotations are for
Netflix when they click on the timeline.

Moreover, and the more concerning aspects around this, is just how
anti-accessibility this pattern is. Breaking the ability to modify the
seeking of a playing video is just basic HTMLVideo element behavior that
has no discernable benefits beyond breaking compliance. Say I created a web
extension which helped a paraplegic use a special controller to seek to
a specific part of a video, this new player behavior only allows
seeking to be implemented by **pretending to move the scrubber by hand**.

I'm really surprised (but not that surprised?) the silly extremes that Netflix
has gone to lock things down. This project will work around it, because this
is still just another video playing on my computer built on top of an
_open_ web 🤷.
