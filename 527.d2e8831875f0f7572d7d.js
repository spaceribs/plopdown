(self.webpackChunkplopdown=self.webpackChunkplopdown||[]).push([[527],{7188:function(e,t,n){var o={"./alpha-released.md":983,"./new-dev-blog.md":9986,"./permissions-manager.md":619};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}i.keys=function(){return Object.keys(o)},i.resolve=a,e.exports=i,i.id=7188},9527:function(e,t,n){"use strict";n.r(t),n.d(t,{BlogModule:function(){return Z}});var o=n(1116),i=n(7703),a=n(2693),s=n(4762),r=n(5440),l=new r.OlP("devblog.posts"),p=n(4393),u=n(697);function h(e,t){if(1&e&&(r.TgZ(0,"li"),r.TgZ(1,"a",12),r._uU(2),r.qZA(),r.qZA()),2&e){var n=t.$implicit;r.xp6(1),r.Q6J("routerLink",null==n.data?null:n.data.attributes.slug),r.xp6(1),r.Oqu(null==n.data?null:n.data.attributes.title)}}function c(e,t){if(1&e&&(r.ynx(0),r.TgZ(1,"p",10),r._uU(2),r.ALo(3,"date"),r.qZA(),r.TgZ(4,"ul",11),r.YNc(5,h,3,2,"li",9),r.qZA(),r.BQk()),2&e){var n=t.$implicit;r.xp6(2),r.hij(" ",r.xi3(3,2,n.date,"MMMM - y")," "),r.xp6(3),r.Q6J("ngForOf",n.posts)}}var d=function(){function e(t){this.dateArchives=t.reduce(function(t,n){var o,i,a,s=new Date(null===(o=null==n?void 0:n.data)||void 0===o?void 0:o.attributes.created),r=new Date(null===(i=null==n?void 0:n.data)||void 0===i?void 0:i.attributes.created).getMonth(),l=new Date(null===(a=null==n?void 0:n.data)||void 0===a?void 0:a.attributes.created).getFullYear(),p=t.find(function(e){return e.year===l&&e.month===r});return null!=p?(p.posts.push(n),p.posts.sort(e.comparePostDates)):t.push({month:r,year:l,date:s,posts:[n]}),t},[]),this.dateArchives.sort(function(e,t){var n=new Date(e.year+"-"+e.month);return new Date(t.year+"-"+t.month).getTime()-n.getTime()})}return e.comparePostDates=function(e,t){var n,o,i=new Date(null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.attributes.created);return new Date(null===(o=null==t?void 0:t.data)||void 0===o?void 0:o.attributes.created).getTime()-i.getTime()},e.\u0275fac=function(t){return new(t||e)(r.Y36(l))},e.\u0275cmp=r.Xpm({type:e,selectors:[["plopdown-blog"]],decls:16,vars:1,consts:[[1,"container"],[1,"hero","is-dark","has-text-centered"],[1,"hero-body"],[1,"title"],[1,"subtitle"],[1,"columns"],[1,"column","is-three-quarters"],[1,"column"],[1,"menu"],[4,"ngFor","ngForOf"],[1,"menu-label"],[1,"menu-list"],["routerLinkActive","is-active",3,"routerLink"]],template:function(e,t){1&e&&(r._UZ(0,"plopdown-site-nav"),r.TgZ(1,"div",0),r.TgZ(2,"section",1),r.TgZ(3,"div",2),r.TgZ(4,"div",0),r.TgZ(5,"h1",3),r._uU(6," Plopdown Dev Blog "),r.qZA(),r.TgZ(7,"h2",4),r._uU(8," Any releases and announcements for Plopdown "),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(9,"div",5),r.TgZ(10,"div",6),r._UZ(11,"router-outlet"),r.qZA(),r.TgZ(12,"div",7),r.TgZ(13,"aside",8),r.YNc(14,c,6,5,"ng-container",9),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r._UZ(15,"plopdown-site-footer")),2&e&&(r.xp6(14),r.Q6J("ngForOf",t.dateArchives))},directives:[p.D,i.lC,o.sg,u.f,i.yS,i.Od],pipes:[o.uU],styles:[".columns[_ngcontent-%COMP%]{padding:0 1.25em}"]}),e}();function g(e,t){if(1&e&&(r.TgZ(0,"article",1),r.TgZ(1,"h3",2),r.TgZ(2,"a",3),r._uU(3),r.qZA(),r.qZA(),r.TgZ(4,"p",4),r._uU(5),r.TgZ(6,"time"),r._uU(7),r.ALo(8,"date"),r.qZA(),r.qZA(),r.TgZ(9,"p"),r._uU(10),r.TgZ(11,"a",3),r._uU(12,"Read More"),r.qZA(),r.qZA(),r.qZA()),2&e){var n=t.$implicit;r.xp6(2),r.Q6J("routerLink",null==n.data?null:n.data.attributes.slug),r.xp6(1),r.Oqu(null==n.data?null:n.data.attributes.title),r.xp6(2),r.hij(" By ",null==n.data?null:n.data.attributes.author," - "),r.xp6(1),r.uIk("datetime",null==n.data?null:n.data.attributes.created),r.xp6(1),r.Oqu(r.lcZ(8,7,null==n.data?null:n.data.attributes.created)),r.xp6(3),r.hij(" ",null==n.data?null:n.data.attributes.excerpt,"... "),r.xp6(1),r.Q6J("routerLink",null==n.data?null:n.data.attributes.slug)}}var m=function(){function e(e){e.sort(d.comparePostDates),this.postRoutes=e.slice(0,20)}return e.\u0275fac=function(t){return new(t||e)(r.Y36(l))},e.\u0275cmp=r.Xpm({type:e,selectors:[["plopdown-archive"]],decls:1,vars:1,consts:[["class","box content",4,"ngFor","ngForOf"],[1,"box","content"],[1,"title"],[3,"routerLink"],[1,"subtitle","meta"]],template:function(e,t){1&e&&r.YNc(0,g,13,9,"article",0),2&e&&r.Q6J("ngForOf",t.postRoutes)},directives:[o.sg,i.yS],pipes:[o.uU],styles:["[_nghost-%COMP%]{margin-bottom:30px;display:block}.meta[_ngcontent-%COMP%]{color:#aaa;margin-bottom:5px;font-size:.8em;font-weight:700;text-transform:uppercase}"]}),e}(),f=n(9624);function w(e,t){if(1&e&&r._UZ(0,"div",7),2&e){var n=r.oxw();r.Q6J("innerHTML",n.routeContent,r.oJD)}}var b,y=function(){return["/blog"]},v=function(){function e(e,t){this.routeContent=null,this.routeData=e.snapshot.data;var n=t.sanitize(r.q3G.HTML,this.routeData.html);null!=n&&(this.routeContent=t.bypassSecurityTrustHtml(n))}return e.\u0275fac=function(t){return new(t||e)(r.Y36(i.gz),r.Y36(f.H7))},e.\u0275cmp=r.Xpm({type:e,selectors:[["plopdown-post"]],decls:14,vars:9,consts:[[1,"box","content"],[1,"section"],[1,"title"],[1,"subtitle","meta"],[3,"innerHTML",4,"ngIf"],[1,"footer"],[1,"button","is-inverted","is-dark",3,"routerLink"],[3,"innerHTML"]],template:function(e,t){1&e&&(r.TgZ(0,"article",0),r.TgZ(1,"section",1),r.TgZ(2,"h1",2),r._uU(3),r.qZA(),r.TgZ(4,"p",3),r._uU(5),r.TgZ(6,"time"),r._uU(7),r.ALo(8,"date"),r.qZA(),r.qZA(),r._UZ(9,"hr"),r.YNc(10,w,1,1,"div",4),r.qZA(),r.qZA(),r.TgZ(11,"footer",5),r.TgZ(12,"a",6),r._uU(13,"Back to Index"),r.qZA(),r.qZA()),2&e&&(r.xp6(3),r.hij(" ",t.routeData.attributes.title," "),r.xp6(2),r.hij(" By ",t.routeData.attributes.author," - "),r.xp6(1),r.uIk("datetime",t.routeData.attributes.created),r.xp6(1),r.Oqu(r.lcZ(8,6,t.routeData.attributes.created)),r.xp6(3),r.Q6J("ngIf",t.routeContent),r.xp6(2),r.Q6J("routerLink",r.DdM(8,y)))},directives:[o.O5,i.yS],pipes:[o.uU],styles:[".meta[_ngcontent-%COMP%]{color:#aaa;margin-bottom:5px;font-size:.8em;font-weight:700;text-transform:uppercase}hr[_ngcontent-%COMP%]{border-width:0;background:transparent;border-top:1px solid #999}footer[_ngcontent-%COMP%]{margin:30px 0}"]}),e}(),k=[];(b=n(7188)).keys().forEach(function(e){var t=b(e);k.push({path:t.attributes.slug,component:v,data:t})});var x=[{path:"",component:d,children:(0,s.ev)([{path:"",component:m}],k)}],I=n(6366),T=n(2547),Z=function(){function e(){}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({providers:[{provide:l,useValue:k}],imports:[[I.o,T.n,o.ez,a.JF,i.Bz.forChild(x)]]}),e}()},983:function(e){e.exports={attributes:{title:"Plopdown Firefox Alpha Released",created:"2020-05-22T12:01:37.136Z",slug:"alpha-release",author:"Spaceribs",tags:["Release"],excerpt:"After quite a few months reading documentation, testing out the proof of concept,\ndeveloping the extension and also creating the infrastructure to support it,\nI can finally say I've got something functional and accessible to share\n"},html:"<p>After quite a few months reading documentation, testing out the proof of concept,\ndeveloping the extension and also creating the infrastructure to support it,\nI can finally say I've got something functional and accessible to share.</p>\n<p><a href=\"/\">You can install it for Firefox on the homepage</a></p>\n<h2>What is Plopdown</h2>\n<p>In the last ~10 years, I've witnessed a shift back towards traditional mass\nmedia. It's been a subtle shift, but with services like Netflix, Hulu and\nespecially YouTube, there are now many tools that take away the one superpower\nthat allowed the web to flourish, bi-directional interaction rather than\none-directional consumption. Here are a few examples:</p>\n<ol>\n<li>\n<p>YouTube and YouTube content creators can shut down discussion in the comments section at any\nmoment, and even fair use critique of another video will likely gain\nyou a copyright strike via Content ID.</p>\n</li>\n<li>\n<p>Hulu attempts to prevent any and all modification of their website via the\nextensions you run. They recently removed the comments section and continue\nto move toward a one directional experience.</p>\n</li>\n<li>\n<p>Netflix has never been built to be a bi-directional product, there is no\ncommunity space and even ratings are laundered in an algorithm. It's content\nlibrary shifts monthly without any say from the users.</p>\n</li>\n</ol>\n<p>What we need is a platform for critique, art, and entertainment which is\nonly connected to the original content by a timecode. Once we separate and\ndesign software that connects the two, we can once again have a mutual\nrelationship with the content we enjoy.</p>\n<p>Plopdown is the platform I'm building to do exactly that. It's is a way\nto inject specially crafted tracks into any HTML5 video as a web extension,\nannotate it, edit it down, add picture-in-picture, you name it. It doesn't\nhave all these capabilities yet, but that's the vision I want to achieve.</p>\n<p>If you share this vision, I'd love to work and collaborate with you!</p>\n<h2>Who am I</h2>\n<p>I'm a UI Developer based out of Baltimore, Maryland. I've been working\nin the web industry in various capacities since 2009.</p>\n<h2>What is Plopdown today</h2>\n<p>We have a fully working extension which scans for videos, saves those\nreferences, and allows you to associate them with a track. Whenever\nyou click on the extension button on a page, it will initialize\nthat track on top of the video.</p>\n<p>Tracks currently support the following cues:</p>\n<ul>\n<li><strong>Info</strong>: Show a title screen for your track, with authors and a\nlink to your website.</li>\n<li><strong>Plop</strong>: Popup Video inspired annotations for trivia and fun facts.</li>\n<li><strong>Audio</strong>: Overlay and synchronize mp3 files with the playing video.</li>\n</ul>\n<p>All features are fully manageable, configurable, and tested,\nbut definitely need tweaking and UX improvements.</p>\n<h2>Architectural Decisions</h2>\n<p>Throughout the proof of concept phase, I had to make some hard choices\nto build something I'd like to support for the next 10+ years. I'm sure\nI'll grow to hate at least some of these decisions down the road, but\nat this moment in time it makes sense:</p>\n<h3>I went with Angular</h3>\n<p>I'm a little biased, I use Angular with my team, but I actually started this\nproject in Vue. I switched away from Vue as soon as I hit my first refactor.\nI struggled to rebuild big parts of the application because Vue allowed me\nto do everything and nothing. I know I probably could have done this in React\nor continued with Vue, but because of the following reasons I decided against that:</p>\n<ol>\n<li>\n<p><strong>I want to be able to pick up and put down this project quickly</strong> I have a life\nand a career, I want to be able to take 3 hours and throw a new feature in without\na lot of ramp up, I find Typescript + Angular allows me to do that.</p>\n</li>\n<li>\n<p><strong>I want to get better with RxJS</strong> I'm constantly learning new things with RxJS\nand it consistently challenges me. The fact that angular provides it out of the box\nfor a project that is literally dealing with a bunch of streaming events is the\nperfect way for me to practice as well as solve a technical problem effectively.</p>\n</li>\n<li>\n<p><strong>I eventually need amazing infrastructure</strong> Web Extensions are hard. managing\nmessages between multiple running applications is hard. Ensuring and maintaining\nproper error handling, code style, testing and readability, these are all extremely\nhard things. For all the boilerplate Angular requires, it does ensure an solid\nfoundation for exactly that.</p>\n</li>\n</ol>\n<p>There are some serious issues with Angular for this particular project that I had\nto overcome:</p>\n<ol>\n<li>\n<p><strong>Angular's Change Detector</strong> Zone.js doesn't know anything about the web extension\nAPI and the event's they emit. Any callbacks or promises need to be wrapped (and you\nneed to know how to wrap them manually). Although I've done that, this is still\nquite an annoying bug to track down for most developers that'll probably cause\nissues in the future.</p>\n</li>\n<li>\n<p><strong>Lack of Angular WebExt Ecosystem</strong> There isn't a lot of other people's web extension projects to\nfall back on for approach or informing design decisions, we're on our own in a lot\nof respects.</p>\n</li>\n<li>\n<p><strong>Angular needs Rampup</strong> Just by going with Angular I'm probably alienating a lot\nof frontend developers, and for that I'm sorry. To develop on this extension, you are\ngoing to need to learn Typescript, RxJS and know the basics of Angular. I'm not\nexpecting perfection though, and I'll be happy to help.</p>\n</li>\n</ol>\n<h3>I went with an NX monorepo</h3>\n<p>Every component of a web-extension is designed as a separate application. The browser-action\npopup needs to talk to the background script, which needs to talk to the content scripts, etc.\nAll of these applications while running in separate execution environments, are indeed\ntightly coupled to work together to perform some pretty elaborate eventing.</p>\n<p>If I change the message for the popup app, I want to know that it breaks the background app,\nand I want to find these cross project issues as quickly as possible. I also want to\nshare libraries between these apps without copying stuff over, and make sure that I have\na scalable way of testing/building only the projects that need to be updated.</p>\n<p><a href=\"https://nx.dev/angular\">NX</a> is a no-brainer for all this. We're never going to build\nanything outside of Javascript, as this will always be designed as a web extension,\nand it gives us a bunch of tools specifically for maintaining lots of different libraries\nand applications (including this very website).</p>\n<h3>I don't want analytics</h3>\n<p>You will find no privacy policy on this website or on the extension because I don't\ncollect any data. I promise you that I will never record your behavior, A/B test you,\nor generate statistics on what you watch.</p>\n<p>This is a tool for creating content, not surveillance.</p>\n<p>I'm depending on users to volunteer me feedback in our github issues:\n<a href=\"https://github.com/spaceribs/plopdown/issues\">https://github.com/spaceribs/plopdown/issues</a></p>\n<h3>I do want syndication</h3>\n<p>The ONLY data sync with the rest of the community that does ping back to any sort\nof centralized service will be the main syndication feed. I plan on keeping that\npopulated with awesome tracks from creators and notifying you with a badge on\nthe extension that a track is available for the content you're watching.</p>\n<p>The approach for this will be a once-a-day sync with the main content feed.\nQueries to determine which page your on and what content you're watching will\nall be done locally against your local copy of this feed. You will also be\nable to setup your own feed or turn this feature off entirely.</p>\n<h2>Special Thanks</h2>\n<p>I want to give a special shoutout to the following people for helping me get\nthis project across the finish line in no particular order:</p>\n<ul>\n<li><strong><a href=\"https://orderoftheleague.com/\">The Order of the League</a></strong> - These guys have been\na huge help and support as my alpha testers for audio cues. Because of them, I have\nmy main creator persona to get the most valuable features out for.</li>\n<li><strong><a href=\"https://github.com/whytheplatypus/\">WhyThePlatypus</a></strong> - for helping me work\nout the more annoying kinks, and overall approach.</li>\n<li><strong><a href=\"https://github.com/suicidejack\">SuicideJack</a></strong> - for the initial inspiration\ninto even looking at the WebVTT spec.</li>\n<li><strong>My Wife</strong> - for keeping me grounded in reality and supporting me and this project\nfor the last couple of months. I love you!</li>\n<li><strong>Sam Small</strong> - For always making me strive towards a mix of perfection and delivery.</li>\n<li><strong><a href=\"https://vimeo.com/user2470144\">Maura Brewer</a></strong> - My sister, giving me crucial\nfeedback so she can use Plopdown in her own video work.</li>\n<li><strong>My Parents</strong> - For listening and supporting my creative rantings and ravings.</li>\n</ul>\n"}},9986:function(e){e.exports={attributes:{title:"New Dev Blog",created:"2020-05-22T10:26:29.395Z",slug:"new-dev-blog",author:"Spaceribs",tags:["Meta","Website"],excerpt:"This is my new tiny devblog for announcing features and releases for plopdown.\nI threw it together as a little side project to Plopdown and it's ludicrously simple,\nbut the code is all mine\n"},html:"<p>Hey!</p>\n<p>This is my tiny devblog for announcing features and releases for plopdown.\nI threw it together as a little side project to Plopdown and it's ludicrously simple,\nbut the code is all mine.</p>\n<p>I'll try my best to keep it up to date and use it as a\ndiary of thoughts and issues i've run into with Plopdown.</p>\n"}},619:function(e){e.exports={attributes:{title:"v0.6 - Permissions Manager",created:"2021-02-28T19:15:31.104Z",slug:"permissions-manager",author:"Spaceribs",tags:["Release"],excerpt:"One of the core principals of Plopdown will always be that this extension will\nprovide you the reigns of what it has access to. We provide minimal permissions\nand it's up to you to open permissions up to specific websites and features\nwithin the extension.\n"},html:'<h2>Permissions Manager</h2>\n<p>One of the core principals of Plopdown will always be that this extension will\nprovide you the reigns of what it has access to. We provide minimal permissions\nand it\'s up to you to open permissions up to specific websites and features\nwithin the extension.</p>\n<p>In accordance with that viewpoint, we don\'t request the <code>tabs</code> permission, or\neven the <code>activeTabs</code> permission. When clicking the extension button on a page\nthat you haven\'t given previous access to, you will be requested to allow\nthis domain explicitly.</p>\n<p>The reason for this is twofold:</p>\n<ul>\n<li>the <code>tabs</code> permission doesn\'t provide granular access.</li>\n<li>the <code>activeTabs</code> permission messes with permissions in such a way as\nto make it impossible to determine what is temporary and what is persistent.</li>\n</ul>\n<p>Unfortunately due to even more limitations in the web extension API, we now require\nthe following permission:</p>\n<ul>\n<li><code>webNavigation</code> permission allows us to get the url of the current tab.\nWith this information, we can do the following:\n<ul>\n<li>Get the origin of the site to request permissions on.</li>\n<li>Detect <code>#plopdown:</code> tracks and prompt if there are any issues initializing\nplopdown on the targeted page (More on this feature below).</li>\n</ul>\n</li>\n</ul>\n<p>We don\'t persist your URLs anywhere, and only check the active tab\'s URL for access\nwhen the extension button is clicked. I\'m hoping that we can migrate this behavior\nto a better solution in the future and completely get rid of the <code>webNavigation</code>\npermission, but for the time being this seems effective.</p>\n<p>The list of websites the plopdown extension is allowed to access can be displayed\nin the extension popup menu:</p>\n<p><img src="/assets/blog-content/permissions-popup.png" alt="Permissions Popup"></p>\n<p>and can be managed in the extension options menu:</p>\n<p><img src="/assets/blog-content/permissions-page.png" alt="Permissions Manager"></p>\n<p>For the last couple of months I\'ve been weaving my way through this major\nchange in approach. Now that it\'s accomplished I\'ll be releasing much more\nbite sized changes and updating this blog with new features as they become\navailable.</p>\n<h2>Link Sharing</h2>\n<p>The next core feature we\'ll be rolling out is link sharing. The goal is that\nyou should be able to send a friend a link to your video as well as display a\nPlopdown on that video automatically. This is by far the #1 use-case we want\nto support, the ability for non-technical users to annotate and critique\nexisting video content outside the boundaries of the creator.</p>\n<p>You can test this feature by going to the new permissions manager, giving\npermission to YouTube, and clicking the test tube icon to automatically\nredirect and initialize a testing plopdown track.</p>\n<p><img src="/assets/blog-content/testtube.png" alt="Test Permissions Icon"></p>\n<p>These special tracks are stored temporarily within the URL in a compressed\nformat as part of the hash. The links themselves look something\nlike the following:</p>\n<pre><code class="language-md">https://www.netflix.com/watch/80018586#plopdown:OoUQQga...pr-KC-ogA\n</code></pre>\n<p>Big shout out to <a href="https://github.com/whytheplatypus">@whytheplatypus</a> for getting\nthis feature up and running, and becoming one of our first contributors!</p>\n<h2>First Big Refactor</h2>\n<p>This new permissions model also revealed some architectural issues with my initial\napproach, and will probably result with more refactors in the future. The majority\nof these issues in approach were due to properly organizing &quot;where&quot; the logic\nfor the permissions and track initialization should occur while purposefully not\nbreaking the existing website.</p>\n<p>These refactors were large enough to force me to perform our first version bump, but\nas we\'re still in alpha hopefully the impact should be negligible. If you do have\nany issues, let me know: <a href="https://github.com/spaceribs/plopdown/issues">https://github.com/spaceribs/plopdown/issues</a>.</p>\n<h2>MIT -&gt; AGPLv3</h2>\n<p>Usually the type of code I create and post are libraries, rather than products. Due\nto this, I defaulted to the MIT license without thinking of the implications. Before\nI ask the community for more contributions, I\'d like to make it clear that the spec\nis owned by the community and cannot be copied wholesale without limitations.</p>\n<p>The AGPLv3 (nicknamed the Amazon GPL) should provide enough limitations to at least\ngive a larger corporation some pause before trying to claim or implement a serious\nlevel of ownership over what this extension does.</p>\n<p>Thanks, and have a nice day! :)</p>\n'}}}]);