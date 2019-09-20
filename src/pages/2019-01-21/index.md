---
path: "/2019-01-21-truffle-solidity-tests"
date: "2019-01-21"
title: "Leveraging a Contract's ABI in truffle/solidity tests"
tags: ["programming", "blockchain", "ethereum", "testing", "solidity", "truffle"]
---

Recently I've been writing a lot of *solidity* code for "smart contracts" on the Ethereum blockchain. Specifically using the [*Truffle* framework](https://truffleframework.com/truffle)

In this blog post I'm going to talk a bit about writing automated tests for these contracts.

I should start by saying that testing solidity code is super important. Like, even more so than most code. Why?

## The stakes are high.

1) It costs money (well Ether) to actually deploy this code to the Ethereum mainnet. And more Ether to invoke methods on it.

2) Its pretty damn easy to write subtle bugs in your Smart Contracts with major drawbacks.

3) Code is *immutable* once it hits the blockchain. Without performing some fancy tricks with multiple linked contracts acting as one, a Smart Contract, once deployed cannot be changed. So if you fuck it up, you're stuck with it

Doing QA in production might have been *OK* when I was writing WordPress sites for small businesses, but it is not OK now. Now we need to test our code **comprehensively**, and **compulsively**.

Testing solidity code could (and probably *should*) be the content for large book. Clearly out of scope for me sitting in bed trying to actually *produce* something before going to bed. But I will talk about one interesting strategy for ensuring comprehensive testing.

## Test that the public interface is what you think it is

I guess maybe that goes without saying. However, I'm actually going to suggest something a bit more *meta* than you might expect.

Using our contract's ABI, we can actually access a declaritive list of all of our contract's public functions and their signatures.

In truffle, you *import* a contract using [`artifacts.require`](https://truffleframework.com/docs/truffle/getting-started/running-migrations#artifacts-require-):

```js
const MyContract = artifacts.require('MyContract')
```

Generally, the code examples you see in truffles documentation and elsewhere use the result of that function as the starting place to deploy that contract. i.e. `MyContract.new()` or `MyContract.deployed()`. But it also conveniently contains the contracts `ABI`.

```js
const MyContract = artifacts.require('MyContract')
const abi = MyContract.toJSON().abi
```

You can use this to access the definition for the contracts constructor:

```js
const constructor = abi.find(x => x.type === 'constructor')
```

Or you can filter it to get a list of all the contracts public methods:

```js
const methods = abi.filter(x => x.type === 'function')
```

Rather than doing a deep dive into all the juicy details found in the ABI, lets just look at a simple unit test archetype which I think can add serious value.

```js
const MyContract = artifacts.require('MyContract')

contract('MyContract', () => {
    it('has expected methods', () => {
        const methods = getContractMethods(MyContract)
        const methodNames = methods.map(m => m.name)
        const expectedMethodNames = [
            'totalSupply',
            'balanceOf',
            'allowance',
            'transfer',
            'approve',
            'transferFrom',
            'increaseAllowance',
            'decreaseAllowance',
        ]
        expect(methodNames).to.include(expectedMethodNames)
        expect(methodNames.length).to.equal(expectedMethodNames.length)
    })
})

function getContractMethods (Contract) {
    return Contract.toJSON().abi.filter(x => x.type === 'function')
}
```

So, we're testing that `MyContract` has the public methods we think it does, and no more. This has a number of benefits:

- If, while working on the contract, we make something public that should be private, or vice-versa, we know about it immediately
- If we add a new public method, this serves as a reminder that we need to write tests for it. (though I'd argue we should probably be writing the tests *first* in TDD fashion)
- This test can be pretty handy as documentation. Its my view that well written unit tests should provide clean, readable documentation for the code under test, and having this as one of the first tests provides something of a table-of-contents, or overview of what you can find.

## Final Thoughts

At the risk of patting myself on the back, I like this pattern and think its quite clever.

I think comfortablility with using the contract ABI will continue come in handy. Event definitions are also in the ABI for example, so its easy to see how to extrapolate a similar test for those. I've also been toying with the idea of using the ABI in more creative ways, and creating tools to interact with in a sort of *fluent* way. But that's a topic for another post.
