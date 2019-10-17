---
path: "/2019-10-17-a-new-js-starter-template"
date: "2019-10-17"
title: "I made my own JS starter template project"
tags: ["programming", "javascript", "github"]
---

I've been having a lot of fun creating a new *Template repository* in GitHub. I'm calling it [`z-starter`][z-starter].

The goal is to have a project that I can copy or fork and eliminate a lot of the boilerplate-creating effort at the inception of new projects.

## Challenges

The biggest problem with this approach is that one size does *not* fit all. Depending on the project, the appropriate tech-stack changes drastically.

Here is just a handful of types of projects I find myself creating (or wanting to create) which could each easily merit their own starter template.

- A bare-bones simple Node.js CLI tool
- A full featured Node.js CLI with fancy menues and options
- A React app, with vanilla JS (or EsNext anyway) and Redux
- A Node.js Express web-service
- A Node.js Apollo-graphql web-service
- A npm-deployable library intended for NodeJS projects
- A npm-deployable library intended for Browser projects
- A e2e test project for a browser app 

Compounding this, I would want a TypeScript variant of each of these, and maybe choose different test-stacks. React projects might use any number of different setups with state-libraries, etc...

## Prior Art & some alternatives I considered

// TODO: discuss different CLI tools: create-react-app, yeoman, etc...
// TODO: discuss a bespoke CLI tool (like someone used in Angular-Buddies)

## What I decided to build

As I said, I created a project called [`z-starter`][z-starter].

I've decided to handle the issue of different types of products (lets call them *archetypes*) via git's branching model.

My plan is meticulously curate the git history of each branch with small, atomic commits starting general (towards the projects initial commit), and becoming more specific the more recent the commit. Ideally, I'd like to be able to branch off at specific decision points, but share as much work between branches as possible.

So you might imagine that I would have a `nodejs` branch for a Node.JS project. But at some point I would have a branch off of *that* which converts it to Typescript. And other branches at convenient places creating essentially a decision tree for creating a project. This approach is far from perfect, as many (most?) such choices are orthoganal to eachother.

// TODO: example here

### Et tu, `create-react-app`?

While the branching strategy seems like it might enable some re-use, right now I only have 2 branches (`nodejs` and `react`) which are totally separate commit histories. I would have liked to share some history at least (like doing an `npm init`, creating some markdown files, adding tools like *prettier*...) but `create-react-app` kind of threw a wrench into that.

The `create-react-app` command pretty much requires that it be invoked on an empty project. For my intentions that kind of sucks, and prevents me from sharing *any* git history between my 2 branches. In order to still share *some* effort, and not redo the same code changes over and over I resorted to `git cherry-pick`.

I've been aggressively re-writing git history on this project (`git rebase --interactive`, etc...) in order to keep it as flexible, and understandable as possible, and to keep the branches sort of similar to eachother.

### Lets see some commits!

Note that many of the commit messages are the same (or similar), but none of the commit hashes are the same (2 totally different commit histories)

**The `react` branch**:

* `e7a42f1` 👷 add github actions workflow
* `0252d39` ✨ Hello, Redux
* `356f114` ➕ add dependency on react-redux ^7.1.1
* `97b595f` ➕ add dependency on redux-starter-kit ^0.8.1
* `b45427b` 🔥 remove some create-react-app cruft
* `24984ae` 💄 add 'prettier' pre-commit hook
* `6aa15e6` 🎨 run prettier on existing code
* `8d8c143` 💄 add prettier
* `6670daf` 🔧 disable lockfiles with .npmrc
* `020258f` 📝 add contributing guide
* `ab270ad` 📝 add blank github pull-request template
* `6a4cacf` 📝 add blank github issue template
* `1d709c7` 📝 update README.md
* `cb11e0f` 🔧 remove 'eject' npm run-script
* `86e58c9` 🎉 npx create-react-app .

**The `nodejs` branch**

* `f03a873` 👷 add github actions workflow
* `c5f661b` ✅ add chai-as-promised
* `8ff74d9` ✅ add chai assertions
* `a9d4633` ✅ add mocha
* `6c6fc8d` 💄 add 'prettier' pre-commit hook
* `6508b9a` 💄 add 'prettier'
* `98f7e5f` 🎉 Hello, World!
* `cd160b4` 📝 add contributing guide
* `7c468ca` 📝 add blank github pull-request template
* `b54bb12` 📝 add blank github issue template
* `0f151b5` 📝 add README.md
* `617f525` 🎉 npm init

## What's next?

The sky's the limit! As I start using this project, I hope to contribute back to it, create new branches, and set myself up for greatness.

As a thought exercise, lets consider I want to build a deployable NodeJS library authored with TypeScript. I'll want to first choose the `nodejs` branch, but some of the more recent commits might not be appropriate. Perhaps I'll create a new `typescript` branch off of one of the commits (maybe after the mocha/chai commits? Or maybe just after Hello, World). I probably wouldn't call it typescript-cli yet -- why be more specific if I have only one `nodejs` branch? But I'd contribute to this project as far as I could without implementing any application-specific (or non-reusable code). At that point, I'd create a *new* project based off of this starter.

[z-starter]: https://github.com/zachlysobey/z-starter