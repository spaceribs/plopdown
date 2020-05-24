---
title: Plopdown Firefox Alpha Released
created: 2020-05-22T12:01:37.136Z
slug: alpha-release
author: Spaceribs
tags:
  - Release
excerpt: |
  After quite a few months reading documentation, testing out the proof of concept,
  developing the extension and also creating the infrastructure to support it,
  I can finally say I've got something functional and accessible to share
---

After quite a few months reading documentation, testing out the proof of concept,
developing the extension and also creating the infrastructure to support it,
I can finally say I've got something functional and accessible to share.

[You can install it for Firefox on the homepage](/)

## What is Plopdown

In the last ~10 years, I've witnessed a shift back towards traditional mass
media. It's been a subtle shift, but with services like Netflix, Hulu and
especially YouTube, there are now many tools that take away the one superpower
that allowed the web to flourish, bi-directional interaction rather than
one-directional consumption. Here are a few examples:

1. YouTube and YouTube content creators can shut down discussion in the comments section at any
   moment, and even fair use critique of another video will likely gain
   you a copyright strike via Content ID.

2. Hulu attempts to prevent any and all modification of their website via the
   extensions you run. They recently removed the comments section and continue
   to move toward a one directional experience.

3. Netflix has never been built to be a bi-directional product, there is no
   community space and even ratings are laundered in an algorithm. It's content
   library shifts monthly without any say from the users.

What we need is a platform for critique, art, and entertainment which is
only connected to the original content by a timecode. Once we separate and
design software that connects the two, we can once again have a mutual
relationship with the content we enjoy.

Plopdown is the platform I'm building to do exactly that. It's is a way
to inject specially crafted tracks into any HTML5 video as a web extension,
annotate it, edit it down, add picture-in-picture, you name it. It doesn't
have all these capabilities yet, but that's the vision I want to achieve.

If you share this vision, I'd love to work and collaborate with you!

## Who am I

I'm a UI Developer based out of Baltimore, Maryland. I've been working
in the web industry in various capacities since 2009.

## What is Plopdown today

We have a fully working extension which scans for videos, saves those
references, and allows you to associate them with a track. Whenever
you click on the extension button on a page, it will initialize
that track on top of the video.

Tracks currently support the following cues:

- **Info**: Show a title screen for your track, with authors and a
  link to your website.
- **Plop**: Popup Video inspired annotations for trivia and fun facts.
- **Audio**: Overlay and synchronize mp3 files with the playing video.

All features are fully manageable, configurable, and tested,
but definitely need tweaking and UX improvements.

## Architectural Decisions

Throughout the proof of concept phase, I had to make some hard choices
to build something I'd like to support for the next 10+ years. I'm sure
I'll grow to hate at least some of these decisions down the road, but
at this moment in time it makes sense:

### I went with Angular

I'm a little biased, I use Angular with my team, but I actually started this
project in Vue. I switched away from Vue as soon as I hit my first refactor.
I struggled to rebuild big parts of the application because Vue allowed me
to do everything and nothing. I know I probably could have done this in React
or continued with Vue, but because of the following reasons I decided against that:

1. **I want to be able to pick up and put down this project quickly** I have a life
   and a career, I want to be able to take 3 hours and throw a new feature in without
   a lot of ramp up, I find Typescript + Angular allows me to do that.

2. **I want to get better with RxJS** I'm constantly learning new things with RxJS
   and it consistently challenges me. The fact that angular provides it out of the box
   for a project that is literally dealing with a bunch of streaming events is the
   perfect way for me to practice as well as solve a technical problem effectively.

3. **I eventually need amazing infrastructure** Web Extensions are hard. managing
   messages between multiple running applications is hard. Ensuring and maintaining
   proper error handling, code style, testing and readability, these are all extremely
   hard things. For all the boilerplate Angular requires, it does ensure an solid
   foundation for exactly that.

There are some serious issues with Angular for this particular project that I had
to overcome:

1. **Angular's Change Detector** Zone.js doesn't know anything about the web extension
   API and the event's they emit. Any callbacks or promises need to be wrapped (and you
   need to know how to wrap them manually). Although I've done that, this is still
   quite an annoying bug to track down for most developers that'll probably cause
   issues in the future.

2. **Lack of Angular WebExt Ecosystem** There isn't a lot of other people's web extension projects to
   fall back on for approach or informing design decisions, we're on our own in a lot
   of respects.

3. **Angular needs Rampup** Just by going with Angular I'm probably alienating a lot
   of frontend developers, and for that I'm sorry. To develop on this extension, you are
   going to need to learn Typescript, RxJS and know the basics of Angular. I'm not
   expecting perfection though, and I'll be happy to help.

### I went with an NX monorepo

Every component of a web-extension is designed as a separate application. The browser-action
popup needs to talk to the background script, which needs to talk to the content scripts, etc.
All of these applications while running in separate execution environments, are indeed
tightly coupled to work together to perform some pretty elaborate eventing.

If I change the message for the popup app, I want to know that it breaks the background app,
and I want to find these cross project issues as quickly as possible. I also want to
share libraries between these apps without copying stuff over, and make sure that I have
a scalable way of testing/building only the projects that need to be updated.

[NX](https://nx.dev/angular) is a no-brainer for all this. We're never going to build
anything outside of Javascript, as this will always be designed as a web extension,
and it gives us a bunch of tools specifically for maintaining lots of different libraries
and applications (including this very website).

### I don't want analytics

You will find no privacy policy on this website or on the extension because I don't
collect any data. I promise you that I will never record your behavior, A/B test you,
or generate statistics on what you watch.

This is a tool for creating content, not surveillance.

I'm depending on users to volunteer me feedback in our github issues:
<https://github.com/spaceribs/plopdown/issues>

### I do want syndication

The ONLY data sync with the rest of the community that does ping back to any sort
of centralized service will be the main syndication feed. I plan on keeping that
populated with awesome tracks from creators and notifying you with a badge on
the extension that a track is available for the content you're watching.

The approach for this will be a once-a-day sync with the main content feed.
Queries to determine which page your on and what content you're watching will
all be done locally against your local copy of this feed. You will also be
able to setup your own feed or turn this feature off entirely.

## Special Thanks

I want to give a special shoutout to the following people for helping me get
this project across the finish line in no particular order:

- **[The Order of the League](https://orderoftheleague.com/)** - These guys have been
  a huge help and support as my alpha testers for audio cues. Because of them, I have
  my main creator persona to get the most valuable features out for.
- **[WhyThePlatypus](https://github.com/whytheplatypus/)** - for helping me work
  out the more annoying kinks, and overall approach.
- **[SuicideJack](https://github.com/suicidejack)** - for the initial inspiration
  into even looking at the WebVTT spec.
- **My Wife** - for keeping me grounded in reality and supporting me and this project
  for the last couple of months. I love you!
- **Sam Small** - For always making me strive towards a mix of perfection and delivery.
- **[Maura Brewer](https://vimeo.com/user2470144)** - My sister, giving me crucial
  feedback so she can use Plopdown in her own video work.
- **My Parents** - For listening and supporting my creative rantings and ravings.
