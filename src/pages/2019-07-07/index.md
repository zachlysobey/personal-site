---
path: "/2019-07-07-blockstack-part-2"
date: "2019-07-07"
title: "Building a Blockstack App (part 2)"
---

> Make sure to read [Part one](./2019-07-07-blockstack-part) of this project / blog post first.

It's been a couple weeks since I started this project, and haven't really gone back to it since. But here I am!

## Goals

Last time, I went through half of the ["Zero to DApp"](https://docs.blockstack.org/develop/zero_to_dapp_1.html) blockstack tutorial. I guess it follows that I should continue down that path.

While I haven't done any work on this since last post, I have done a bit more thinking about what I'd like to build. I really like the idea of having a personal, and configurable app for generating content and storing it in [Gaia](https://github.com/blockstack/gaia) (Blockstack's decentralized storage system somewhat analogous to Amazon S3). This "content" would be a variety of different *shapes*. I'm thinking I'll start with microblog-style status updates, and perhaps move to photos and such. I'll try to bear these modest goals in mind while going through the rest of the tuturial.

## Next steps: Routing with *React Router*

The tutorial gives you a pretty fully baked React app. I've built some pretty serious React apps before, and a few smaller toy apps, but I haven't really made anything non-trivial on my own. Always as just a cog in the machine. This is all just a preamble for me to admit I'm not super confident in setting up routing. So I'm going to take a little side-trip and document my installation and usage of [React Router](https://reacttraining.com/react-router/), which I *believe* is the de-facto solution for routing in React (and what's used by the *zero to dapp* tutoralial project).

React Router apparently has a web (dom) version and a mobile version. Eventually I'd like for this app to cross-compile as a react-native app and an electron app, but for now, I'm just gonna target the browser since that's my comfort zone, and I'm already learning enough new things here.

### Installation

This part is easy:

- `yarn add react-router-dom`
- `yarn add -D @types/react-router-dom` (for the TS types)

### Usage

This packager outputs a *React component* called [`BrowserRouter`](https://reacttraining.com/react-router/web/api/BrowserRouter)

I'll put this in my `src/index.tsx` for now:

```ts
import { BrowserRouter } from 'react-router-dom'
```

