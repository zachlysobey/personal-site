---
path: "/2019-07-07-blockstack-part-2"
date: "2019-07-07"
title: "Building a Blockstack App (part 2)"
tags: ["programming", "blockchain", "blockstack"]

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

It seems that this is a "Higher order component" that I wrap my app in which will allow my app to use the *HTML5 history API* to keep my url paths and app-state in sync.

So I'll use it something like *this* and put subsequent routing stuff in `App.ts` and its sub-components.

```tsx
const app = (
    <BrowserRouter>
        <App userSession={userSession} />
    </BrowserRouter>
)
```

So far this doesn't do anything, but my app *does* have a couple distinct routes that I should get working with it:

 - a "Landing" page with a sign-in button
 - a "Signed in" page for once the user is authenticated

The *React Router* `Route` component defines behavior for a path.

Currently without this router, my "*routing*" looks like this:

```ts
userSession.isUserSignedIn()
    ? <SignedIn name={'World'}/>
    : <Landing userSession={userSession}/>
```

This is analogous to a HTTP *redirect* in traditional (non-SPA) terms.

I can't just do:

```ts
userSession.isUserSignedIn()
    ? <Route path="/signed-in/" component={SignedIn} />
    : <Route path="/landing/" component={Landing} />
```

Besides the above totally missing the *props* I was passing in (easily remedied), this won't actually update the path. `<Route ...>` will take the `path` prop and render the `component` *if* it matches the url path.

What I can *maybe* do, is something more like this:

```tsx
updatePathIfMismatch(userSession.isUserSignedIn())
<Route path="/signed-in/" component={SignedIn} />
<Route path="/landing/" component={Landing} />
```

This would require writing a `updatePathIfMismatch` function which changes the path if it doesn't match the user session state.

```ts
function updatePathIfMismatch (isSignedIn) {
    if (isSignedIn) {
        if (pathMatches('/signed-in/')) {
            return
        }
        window.location = '/signed-in/'
    } else {
        if (pathMatches('/landing/')) {
            return
        }
        window.location = '/landing/'
    }
}
```

I didn't bother implementing `pathMatches`, becuase the above approach sucks. You can imagine that it gets a lot more complicated when I have more paths for an authenticated user.

With respect to routing, *auth* stuff is a bit of a special case. *Most* routing would be more like clicking a link on the site (an `<a href="...">`) or a `<Link to="...">` with *React Router*. But dealing with authentication, as in this app would use automatic redirects. The above approach should work, *but* its not really the React way. Its very *imperitive*, where I want something more *declaritive*.

Luckily [*React Router* has mechanisms to handle this kinda thing](https://reacttraining.com/react-router/web/example/auth-workflow).

I'll adapt a `PrivateRoute` component from their example code which wraps a regular `Route`, but uses the `<Redirect>` component to shoo away un-authenticated users.

```ts
import React from 'react'
import { UserSession } from 'blockstack'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'

const LandingRedirect: React.StatelessComponent<Partial<RouteProps>> = ({
    location
}) =>
    <Redirect
        to={{
            pathname: "/landing/",
            state: { from: location }
        }}
    />

interface Props extends RouteProps {
    userSession: UserSession,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
}
export const PrivateRoute: React.StatelessComponent<Props> = ({
    component: Component,
    userSession,
    ...rest
}) => {
    const isSignedIn = userSession.isUserSignedIn()
    return (
        <Route {...rest}
            render={props => isSignedIn
                ? <Component {...props} />
                : <LandingRedirect {...props} />
            }
        />
    )
}
```

It took quite a while to make the TS types work here, but it works.

And now I'm getting a bit tired, so gonna call it for now. I didn't actually hit anymore of the *zero to dapp* tutorial, other than sorta doing the Router stuff which they provide more or less without explanation.

See [this commit](https://github.com/zachlysobey/blockstack-app-ts-react/commit/50d2c865f6ee8f0be939a0cf6f26643fe4f95144) for the progress up until this point