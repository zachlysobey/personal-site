webpackJsonp([42093647816350],{354:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Recently I\'ve been writing a lot of <em>solidity</em> code for "smart contracts" on the Ethereum blockchain. Specifically using the <a href="https://truffleframework.com/truffle"><em>Truffle</em> framework</a></p>\n<p>In this blog post I\'m going to talk a bit about writing automated tests for these contracts.</p>\n<p>I should start by saying that testing solidity code is super important. Like, even more so than most code. Why?</p>\n<h2>The stakes are high.</h2>\n<ol>\n<li>\n<p>It costs money (well Ether) to actually deploy this code to the Ethereum mainnet. And more Ether to invoke methods on it.</p>\n</li>\n<li>\n<p>Its pretty damn easy to write subtle bugs in your Smart Contracts with major drawbacks.</p>\n</li>\n<li>\n<p>Code is <em>immutable</em> once it hits the blockchain. Without performing some fancy tricks with multiple linked contracts acting as one, a Smart Contract, once deployed cannot be changed. So if you fuck it up, you\'re stuck with it</p>\n</li>\n</ol>\n<p>Doing QA in production might have been <em>OK</em> when I was writing WordPress sites for small businesses, but it is not OK now. Now we need to test our code <strong>comprehensively</strong>, and <strong>compulsively</strong>.</p>\n<p>Testing solidity code could (and probably <em>should</em>) be the content for large book. Clearly out of scope for me sitting in bed trying to actually <em>produce</em> something before going to bed. But I will talk about one interesting strategy for ensuring comprehensive testing.</p>\n<h2>Test that the public interface is what you think it is</h2>\n<p>I guess maybe that goes without saying. However, I\'m actually going to suggest something a bit more <em>meta</em> than you might expect.</p>\n<p>Using our contract\'s ABI, we can actually access a declaritive list of all of our contract\'s public functions and their signatures.</p>\n<p>In truffle, you <em>import</em> a contract using <a href="https://truffleframework.com/docs/truffle/getting-started/running-migrations#artifacts-require-"><code class="language-text">artifacts.require</code></a>:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> MyContract <span class="token operator">=</span> artifacts<span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'MyContract\'</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Generally, the code examples you see in truffles documentation and elsewhere use the result of that function as the starting place to deploy that contract. i.e. <code class="language-text">MyContract.new()</code> or <code class="language-text">MyContract.deployed()</code>. But it also conveniently contains the contracts <code class="language-text">ABI</code>.</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> MyContract <span class="token operator">=</span> artifacts<span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'MyContract\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> abi <span class="token operator">=</span> MyContract<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>abi</code></pre>\n      </div>\n<p>You can use this to access the definition for the contracts constructor:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> constructor <span class="token operator">=</span> abi<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'constructor\'</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Or you can filter it to get a list of all the contracts public methods:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> methods <span class="token operator">=</span> abi<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'function\'</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Rather than doing a deep dive into all the juicy details found in the ABI, lets just look at a simple unit test archetype which I think can add serious value.</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> MyContract <span class="token operator">=</span> artifacts<span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'MyContract\'</span><span class="token punctuation">)</span>\n\n<span class="token function">contract</span><span class="token punctuation">(</span><span class="token string">\'MyContract\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">\'has expected methods\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> methods <span class="token operator">=</span> <span class="token function">getContractMethods</span><span class="token punctuation">(</span>MyContract<span class="token punctuation">)</span>\n        <span class="token keyword">const</span> methodNames <span class="token operator">=</span> methods<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n        <span class="token keyword">const</span> expectedMethodNames <span class="token operator">=</span> <span class="token punctuation">[</span>\n            <span class="token string">\'totalSupply\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'balanceOf\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'allowance\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'transfer\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'approve\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'transferFrom\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'increaseAllowance\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'decreaseAllowance\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span>\n        <span class="token function">expect</span><span class="token punctuation">(</span>methodNames<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span>expectedMethodNames<span class="token punctuation">)</span>\n        <span class="token function">expect</span><span class="token punctuation">(</span>methodNames<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expectedMethodNames<span class="token punctuation">.</span>length<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">function</span> <span class="token function">getContractMethods</span> <span class="token punctuation">(</span>Contract<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Contract<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>abi<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'function\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>So, we\'re testing that <code class="language-text">MyContract</code> has the public methods we think it does, and no more. This has a number of benefits:</p>\n<ul>\n<li>If, while working on the contract, we make something public that should be private, or vice-versa, we know about it immediately</li>\n<li>If we add a new public method, this serves as a reminder that we need to write tests for it. (though I\'d argue we should probably be writing the tests <em>first</em> in TDD fashion)</li>\n<li>This test can be pretty handy as documentation. Its my view that well written unit tests should provide clean, readable documentation for the code under test, and having this as one of the first tests provides something of a table-of-contents, or overview of what you can find.</li>\n</ul>\n<h2>Final Thoughts</h2>\n<p>At the risk of patting myself on the back, I like this pattern and think its quite clever.</p>\n<p>I think comfortablility with using the contract ABI will continue come in handy. Event definitions are also in the ABI for example, so its easy to see how to extrapolate a similar test for those. I\'ve also been toying with the idea of using the ABI in more creative ways, and creating tools to interact with in a sort of <em>fluent</em> way. But that\'s a topic for another post.</p>',frontmatter:{date:"January 21, 2019",path:"/2019-01-21-truffle-solidity-tests",title:"Leveraging a Contract's ABI in truffle/solidity tests"}}},pathContext:{}}}});
//# sourceMappingURL=path---2019-01-21-truffle-solidity-tests-021fb21d70070746834d.js.map