---
path: "/2019-11-11-typeahead-component"
date: "2019-11-11"
title: "Authoring an autocomplete / typeahead react component"
tags: ["programming", "javascript", "react", "typeahead", "autocomplete", "component"]
draft: true
---

## NOTE: this is just a draft -- published to Master & deployed because no one reads this blog anyway ;)

A few days ago, as a coding challenge for a job interview, I made a thing.
Its a pretty basic React typeahead (autocomplete) component I named `Typeahead-Z`.

- Source code: https://github.com/zachlysobey/typeahead-z/
- Demo site: https://zachlysobey.github.io/typeahead-z/

I authored it with the following tech-stack:

- TypeScript
- React (via create-react-app)
- CSS Modules
- GitHub actions for CI
- GitHub pages for demo site

I've been thinking a lot about component libraries lately, and this might be the start of my own React-based collection of components.

One of my main takeaways from this project: building a **good, reusable** component is not easy. The basic idea of a typeahead widget is pretty easy

## Properties of a good, reusable component?

### Flexible

It should work for a number of use-cases

### Minimal

This is the flip-side of flexible. A good component is flexible, but not so flexible that it becomes unweildy, or causes too much bundle-size bloat.

### Accessible

This is a **big** topic, that often does not get enough attention.

<!-- TODO: put an accessibility definition here? -->

I'll refrain from defining accessibility here, but considering accessibility is among the most important things to consider here. Here is just a quick, incomplete list of what should be considered.

- work well with screen-readers
- usable with expected keyboard shortcuts.
- should have focus styles
- clickable areas should be obvious/intuitive
- good contrast for people with color-blindness, etc...

Browser vendors, and standards bodies have put a **huge** amount of work in getting web technology to be accessible. Native form elements work pretty darn good. Then us developers tend to make our fancy little wrappers around them and screw everything up. Its our responsibilty to make sure we address these concerns.

<!-- TODO: talk about Aria etc? -->
<!-- TODO: Add some resources? -->

### Well documented

It might be flexible as heck, but don't make folks (even your future self) have to reverse engineer the thing to figure out how to use it.

Well documented code:

- explains all the available options
- provides code snippets and examples
- has demos where the user can experiment

### Well tested, and Cross-browser compatible

Its not a good component unless it works. And you don't know if it works unless its tested.

### Good versioning practice

I've been bitten more times than I could count by library/framework authors introducing breaking changes in non-major versions. Proper versioning is something that is easy to mess up, and takes discipline to get right. Its really tough to automate this -- so you just have to think about it, and get it right. Nothing destroys confidence in a library than it breaking your whole project with a patch update.

## Is my `TypeaheadZ` component good and reusable?

**No**, not really. It is not (yet) in a state where I would be comfortable deploying it into production, and certainly not at a point where I would publish it for others to use.

Judging it base on the properties I listed above:

- Flexible: I have a few options here, but would like to add more. <!-- TODO: discuss missing functionality-->
- Minimal: I do pretty good in this respect so far :)
- Accessible: It works reasonably well with the keyboard, and since its based on a native text-input its probably not totally inaccessible to screen readers -- but I really doubt that the suggestion list works well in this respect. It probably needs some serious attention and a healthy dose of some `aria` tags.
- Well documented: I have some usage information, but if this was going to be a published component library, its very light in this respect. One thing in its favor is the TS typings, so at least the usage is somewhat *discvoerable* but I'd like to do a lot more here.
- Well tested, and Cross-browser compatible: Nope and nope. There are really *no* automated tests, and I have only loaded this with the latest Chrome. I suspect its pretty good X-browser since I'm not doing anything too weird, but thats no excuse to not test it. In poking around with it, I think there are some outstanding bugs, and I kept having regressions during developement. I should have added automated tests *much* earlier in the process.
- Good versioning practice: I still haven't released version `1.0` yet, so I get a pass.