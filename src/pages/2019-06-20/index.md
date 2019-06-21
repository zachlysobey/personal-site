---
path: "/2019-06-20-blockstack"
date: "2019-06-20"
title: "Building a Blockstack App"
---

> Long time no see, Blog.

I had a short day at work today (sorta sick), but want to do some OSS stuff.
Also this is maybe gonna be my first real project on a new personal computer.
I got a 13" MacBook pro, the less-expensive version, no fancy touchbar.

## Blockstack

I've recently become aware of a organization named "Blockstack".

> https://blockstack.org/

In short, they are trying to re-imagine the internet, using decentralized technology like blockchain.

*This would be a good time to read up on Blockstack. They have some good YouTube videos too!*


### Learnin' stuff

So far, my only real experience here is having done their [10-minute "Hello Blockstack" tutorial](https://docs.blockstack.org/browser/hello-blockstack)

But that was pretty basic.

I think I'll take the next step by skimming the (45 minute) [Zero to DApp tutorial at docs.blockstack.org](https://docs.blockstack.org/develop/zero_to_dapp_1.html).

**Lesson 1**: Both these tutorials use this yeoman app generator thinggy

> https://github.com/blockstack/blockstack-app-generator

Honestly I don't think I'm the biggest fan from what I saw in "Hello Blockstack". The generated code is too low-level (DOM manipulation, etc...)-- I want a bit more abstraction. Thus, skipping that entirely and instead starting with `create-react-app`.

**Lesson 2**: I can get this sweet T-Shirt for makin' Apps? Oh Boy!

![blockstack tshirt](https://docs.blockstack.org/develop/images/tshirt-blank.png)

**Lesson 3**: To build something interesting, you probably need to integrate one-or-more blockstack services:

Ex:
- Blockstack Browser (https://browser.blockstack.org)
- Gaia data storage hub (https://hub.blockstack.org/)

As I understand it, Gaia is roughly equivalent to an Amazon S3 kind of product, but of course, distributed, secure, etc...

That is probably the product we're gonna use here first.

**Lesson 4**: Actually, the [blockstack app generator](https://github.com/blockstack/blockstack-app-generator) has a react mode too! Maybe I should try that...

> `$ yo blockstack:react`

But that seems to not be set up with Typescript out of the box.

**Lesson 5** Looking at their sample-app (Animal Kingdom) I see its probably the project structure I want. Typescript, react, etc...

> https://github.com/blockstack/animal-kingdom/blob/master/package.json

*But its *LIES* (lol j/k). But.. it doesn't appear like TS is actually used in the project.

I tried to be a good citizen and opened an [issue on GitHub](https://github.com/blockstack/animal-kingdom/issues/239). Not a good enough citizen to open a PR though. `¯\_(ツ)_/¯`


## Writing a DApp

I'm like half-way through that tutorial, and they're about to start getting into the actual code.

> https://docs.blockstack.org/develop/zero_to_dapp_3.html

This seems a good time to get started.

I've decided I'm not using their demo project, which may be a mistake, but `¯\_(ツ)_/¯`.

### Bootstrapping

*In the content below, I'll be working with a fresh git repo. See the final result here:*

> https://github.com/zachlysobey/blockstack-app-ts-react

Lets start our Typescript + React app.

```sh
$ yarn create react-app blockstack-app-ts-react --typescript
```

That invokes *create-react-app* to generate a pretty fully formed React app.

```sh
$ cd blockstack-app-ts-react/
$ tree -I 'node_modules|\.git' -a
.
├── .gitignore
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   └── serviceWorker.ts
├── tsconfig.json
└── yarn.lock

2 directories, 16 files
```

The next step is to actually get this working with Blockstack.

```sh
$ yarn add blockstack
```

That adds `blockstack` to our `package.json`.

```diff
+    "blockstack": "^19.2.1",
```

I *think* thats all I need to get started.

### Integrating blockstack with react

The animal kindom app starts by creating a `UserSession` instance and using it in their `App.jsx`.

They use `class` component syntax, which I tend *not* to use, so instead, I'll *inject* the instance as Props.

Here's the relevant code:

**`src/index.tsx`**:

```tsx
import { UserSession } from 'blockstack';

const userSession = new UserSession()
const app = <App userSession={userSession} />;
const $root = document.getElementById('root');
ReactDOM.render(app, $root);
```

**`src/App.tsx`**:

```tsx
import { UserSession } from 'blockstack';

interface AppProps {
  userSession: UserSession
}
const App: React.FC<AppProps> = ({
  userSession
}) => {
  return (
    <div className="App">
      ...
    </div>
  );
}

export default App;
```

I should probably elaborate a bunch more on the next step. But it took a fair amount of effort from this point, to a proper Blockstack "Hello world"

See the following commit for the necessary code

> https://github.com/zachlysobey/blockstack-app-ts-react/commit/bc053bfcdbf9b4f80ecdcec0f99eb07b0771d22b

Some interesting points:

 - In order for sign-in to Blockstack to work from a local environment, a bunch of CORS stuff is required. I just liberally *stole* code from the animal kingdom project. Namely their `/cors` code and `/src/setupProxy.js`. I think I likely took more than is actually required. I can clean this up later perhaps.
 - The sign-in flow, as far as I've seen, works with old-school page redirects, and `window.location = ` etc...
 - I'm now passing an `AppConfig` object to my `UserSession` constructor. Not really sure exactly how this piece works yet. Something about requesting permissions for the app when you sign-in.

## Signing off for now

I maybe didn't get as far as I wanted or expected. That 45 minute tutorial took at least a couple hours of my time, but I was also writing this, and just generally tinkering. I think I learn better that way, as opposed to blindly following someone elses instructions.

Hopefully I'll write another installment of this, and keep interating. Check back soon!
