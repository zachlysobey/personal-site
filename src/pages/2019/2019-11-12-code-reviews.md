---
path: "/2019-11-12-code-reviews"
date: "2019-11-12"
title: "How to do code reviews well"
tags: ["programming", "code-reviews"]
draft: true
---

## Why code review

- catch bugs
- share knowledge
- increase maintainability

## Don't be an asshole

You might read this and think, "I'm not an asshole; this doesn't effect me". Unfortunately it probably does.

Code reviews are probably one of the hardest mediums to *not* be an asshole in.

- You're actively criticizing someones work.

## Be timely about it

Consider introducing an SLA.

Dangers of PRs hanging around a long time:
- merge conflicts
- context switching

### Syncronous vs Asyncronous reviews

I think that most people think of code-reviews as the thing that happens after they submit a PR. You push your code up somewhere, and wait for people to look at it. Maybe they get notifications, or maybe you tap them on the shoulder. But then you go off and do something else, and then get a notification or a tap on the shoulder when the review is complete.

This is what I'm calling *asyncronous* code reviews. *Syncronous* reviews are when you look at the code, in real time, with your peers. You tap on a shoulder and look at a PR, or even just some local code, together.

## Run the code & the tests

## Create some rules & standards

### Create a checklist

GitHub supports PR templates, and these are a great way to add some explicit reminders of

## Code review tools

Github
Bitbucket / Crucible

https://lp.codacy.com/code-reviews


## Other peoples' takes on code reivews

Google's Engineering Practices documentation: How to do a code review
https://google.github.io/eng-practices/review/reviewer/

Google Testing Blog: Code Health: Respectful Reviews == Useful Reviews
https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html

MPJ's Musings Fun Fun Function: Code review discipline and working contracts (Video)
https://www.youtube.com/watch?v=iGBWyhiqBsk
