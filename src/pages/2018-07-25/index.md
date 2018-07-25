---
path: "/2018-07-25-cow-log"
date: "2018-07-25"
title: "Cow Logging and Acoustic Metal"
---

Today (the 24th really), I worked from home. And I created some stuff after work!

I did [my daily YouTube post](../music/) (some acoustic guitar metal lol)

And then I wrote a really odd JavaScript npm module:
[`@zachlysobey/cow-log`](https://www.npmjs.com/package/@zachlysobey/cow-log)

It's essentially a logger function, but instead of executing with parens (`()`),
its executed on *backtick* template strings.

```javascript
cow.log`result: ${result}`
```

It has the added benefit of pretty-printing any objects posted into the little
`${...}`s

*Oh ya, did I forget to say? There's cows!*

```text
 ____________________________
( result: {                  )
(   "data": "my result data" )
( }                          )
 ----------------------------
        o   ^__^
         o  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

I got a kick out of writing this. __Why?__

- because [*tagged* template string functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) are weird.
- because cows are fun
- b/c I wrote some really weird/ugly code to go along with it.

For whatever reason, sometimes **it feels good to write bad code**.

Here's the full implementation:

*from: https://github.com/zachlysobey/cow-log/blob/master/index.js*

```javascript
const cow = require('cowsay')

const objectToPrettyString = (o) => JSON.stringify(o, null, 2)

module.exports = {
    log(strings, ...objects) {
        console.log(
            cow.think({
                text: strings
                    .reduce(
                        (outputs, str, i) => {
                            const hasObject = i < objects.length
                            return (str === '')
                                ? hasObject
                                    ? [...outputs, objectToPrettyString(objects[i])]
                                    : outputs
                                : hasObject
                                    ? [...outputs, str, objectToPrettyString(objects[i])]
                                    : [...outputs, str]
                        },
                        []
                    )
                    .join('')
            })
        )
    }
}
```