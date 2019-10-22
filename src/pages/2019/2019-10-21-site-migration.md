---
path: "/2019-10-21-site-migration"
date: "2019-10-21"
title: "Ship it! Finally using this site for zach.lysobey.com"
tags: ["programming", "github", "deployment", "hosting", "dns"]
---

It's finally happened. After over a year of lazily working on this website, I've replaced the old WordPress blog I had at http://zach.lysobey.com. It was previously only available via a github.io github pages URL.

I've *archived* the old site at http://old.zach.lysobey.com.

## Stumbling blocks

Not that I'm sure anyone has noticed, but I actually totally broke this page for a few days. I did not properly set up the DNS config with my DNS provider, and zach.lysobey.com was still pointing at a (broken) copy of the old WordPress site. In the meantime, I'd configured GitHub to point *this site* my domain, so the GH pages link was totally broken in the interim.

Luckily (?), this site gets no traffic, makes no uptime guarantees, and no one cares if its down (except me). So I was able to just ignore it being horribly broken until I had the energy to make a call to my DNS Provider (1&1). It turns out, the problem was simple. I'd created a CNAME record for my subdomain, but I still had a A-record pointing at the old web-host. And now we're back in business!

*If you're curious, see a bit more info on the [GitHub Issue I used to track this effort](https://github.com/zachlysobey/personal-site/issues/12).*

## Embarassing content live now?

One of the reasons I was avoiding publishing this site on my proper domain, is I've been considering it a work-in-progress and leaving some unfinished, and even slightly embarassing content lying about. (I'm looking at *you* [zach.lysobey.com/music](http://zach.lysobey.com/music)).

But I've decided to exercise a bit of an IDGAF mentality here. Its never going to be *good enough* so I might as well just get something out there. 
