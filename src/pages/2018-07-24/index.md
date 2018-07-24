---
path: "/2018-07-24-code-samples"
date: "2018-07-24"
title: "Code Samples"
---

I can now syntax highlight my code samples in MarkDown blogposts via [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)!

[PrismJS comes with a bunch of themes](https://github.com/PrismJS/prism/tree/master/themes) out of the box. And [there are even more out there](https://github.com/PrismJS/prism-themes). At the time of writing, I am using `prism-okaidia`, but that's subject to change.

Some small code snippets just to show off:


```javascript
async function testJsFunction (foo) {
    console.log('FOO:', foo)
}
```

```typescript
interface TestTsInterface extends Foo {
    bar: (a: number, b: string): Promise<void>
}
```

```diff
+  does this work
- idk
```

```bash
$ cat paper.txt | grep author | wc
```