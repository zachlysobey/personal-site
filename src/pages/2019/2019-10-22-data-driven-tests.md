---
path: "/2019-10-22-data-driven-tests"
date: "2019-10-22"
title: "Data Driven Tests"
tags: ["programming", "javascript", "testing"]
---

I think a lot about testing and testing patterns. Testing complex code can sometimes seem like an exercise in futility. It takes hours setting up different frameworks and tools, and hours again creating dummies and mocks and fakes. And at the end, your test code is often so dense it is tough to read and maintain. This is part of the reason I like thinking about testing -- because it is challenging to do well. Today however, I'm not going to tackle all that complexity. I want to talk about my favorite kind of tests -- easy and obvious ones!

## Testing simple, pure functions.

First let me define what I mean by a pure function. This is a functional programming (and mathmatical!) concept. Thankfully its not as confusing as Monads and Functors.

A "**pure function**" is just a function which, for the same input, will always return the same output. See [the Wikipedia page on "Pure Function"](https://en.wikipedia.org/wiki/Pure_function) for more info.

I **love** testing pure functions because it is **easy**! You pass it some input, and test that the output is what you expect. There is no mocking of external processes, no complex environment or precondition setup. Just clean, beautiful tests!.

Consider this contrived example testing an `add` function (using a JS test framework like *mocha*):

```js
describe('add function', function () {
    it(`returns 0 when passed 0, 0`, function () {
        assert.equal(0, add(0, 0))
    })
    it(`returns 0 when passed -1, 1`, function () {
        assert.equal(2, add(-1, 1))
    })
    it(`returns 2 when passed 1, 1`, function () {
        assert.equal(2, add(1, 1))
    })
    it(`returns 5 when passed 2, 3`, function () {
        assert.equal(5, add(2, 3))
    })
    it(`returns Infinity when passed Infinity, Infinity`, function () {
        assert.equal(Infinity, add(Infinity, Infinity))
    })
})
```

**Output:**

```txt
add function
    ✓ returns 0 when passed 0, 0
    ✓ returns 0 when passed -1, 1
    ✓ returns 2 when passed 1, 1
    ✓ returns 5 when passed 2, 3
    ✓ returns Infinity when passed Infinity, Infinity
```

See? That was nice and easy. But its not "**data-driven**".

## Driving with Data!

By "data driven", I mean *driving* the test cases with data by supplying a data structure with the inputs and expected outputs. This is essentially the 2 pieces involved in testing *any* pure function, so it makes sense to DRY up our testing approach with this in mind.

See the following *refactor* of the above test code:

```js
describe('add function', function () {
    const testCases = [
        { input: [0, 0], expected: 0 },
        { input: [-1, 1], expected: 0 },
        { input: [1, 1], expected: 2 },
        { input: [2, 3], expected: 5 },
        { input: [Infinity, Infinity], expected: Infinity },
    ]

    testCases.forEach(({ input, expected }) => {
        it(`returns ${expected} when passed ${input}`, function () {
            const result = add(...input)
            assert.equal(expected, result)
        })
    })
})
```

This is a test pattern that I have found incredibly useful. Its perhaps a little more dense and confusing than the initial sample, but see how easy it is to add additional cases! It would literally be just a single line addition!

This is just the basic pattern, but you can probably imagine lots of different variations it could take. One thing I often do is add a 3rd property, `description`, to the testCase objects, which becomes the first argument to `it`.

<aside><code><pre>// TODO: add link to GH Gist with different variations on this pattern</pre></code></aside>

This pattern is something that is not specific to JavaScript mocha tests. 

## It gets better!

Some test frameworks provide a mechanism to supply "data tables" to data-drive the tests in a more intuitive and readable way!

The first time I encountered it was in the excellent *Groovy* test-framework **Spock** (🖖). For my money, this is even more beautiful than my above JavaScript example because it allows you to create a *data-table*.

```groovy
class Add extends Specification {
    def "add function" (int a, int b, int expected) {
        expect:
        Math.add(a, b) == expected

        where:
        a | b | expected
        1 | 3 | 4
        7 | 4 | 11
        0 | 0 | 0
    }
}
```

Even if you don't know Groovy, I'll bet that you intuitively understand what the above example is doing.

The groovy/spock example is pretty similar to Cucumber tests with the Gherkin language. Unfortunately, I'm not quite as familiar with that syntax, and don't have a test-env set up with it currently.

<aside><code><pre>// TODO: add Cucumber data-table test example</pre></code></aside>
