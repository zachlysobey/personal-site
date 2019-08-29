webpackJsonp([90784177564858],{359:function(n,a){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p>Make sure to read <a href="./2019-07-07-blockstack-part">Part one</a> of this project / blog post first.</p>\n</blockquote>\n<p>It\'s been a couple weeks since I started this project, and haven\'t really gone back to it since. But here I am!</p>\n<h2>Goals</h2>\n<p>Last time, I went through half of the <a href="https://docs.blockstack.org/develop/zero_to_dapp_1.html">"Zero to DApp"</a> blockstack tutorial. I guess it follows that I should continue down that path.</p>\n<p>While I haven\'t done any work on this since last post, I have done a bit more thinking about what I\'d like to build. I really like the idea of having a personal, and configurable app for generating content and storing it in <a href="https://github.com/blockstack/gaia">Gaia</a> (Blockstack\'s decentralized storage system somewhat analogous to Amazon S3). This "content" would be a variety of different <em>shapes</em>. I\'m thinking I\'ll start with microblog-style status updates, and perhaps move to photos and such. I\'ll try to bear these modest goals in mind while going through the rest of the tuturial.</p>\n<h2>Next steps: Routing with <em>React Router</em></h2>\n<p>The tutorial gives you a pretty fully baked React app. I\'ve built some pretty serious React apps before, and a few smaller toy apps, but I haven\'t really made anything non-trivial on my own. Always as just a cog in the machine. This is all just a preamble for me to admit I\'m not super confident in setting up routing. So I\'m going to take a little side-trip and document my installation and usage of <a href="https://reacttraining.com/react-router/">React Router</a>, which I <em>believe</em> is the de-facto solution for routing in React (and what\'s used by the <em>zero to dapp</em> tutoralial project).</p>\n<p>React Router apparently has a web (dom) version and a mobile version. Eventually I\'d like for this app to cross-compile as a react-native app and an electron app, but for now, I\'m just gonna target the browser since that\'s my comfort zone, and I\'m already learning enough new things here.</p>\n<h3>Installation</h3>\n<p>This part is easy:</p>\n<ul>\n<li><code class="language-text">yarn add react-router-dom</code></li>\n<li><code class="language-text">yarn add -D @types/react-router-dom</code> (for the TS types)</li>\n</ul>\n<h3>Usage</h3>\n<p>This packager outputs a <em>React component</em> called <a href="https://reacttraining.com/react-router/web/api/BrowserRouter"><code class="language-text">BrowserRouter</code></a></p>\n<p>I\'ll put this in my <code class="language-text">src/index.tsx</code> for now:</p>\n<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts">import { BrowserRouter } from &#39;react-router-dom&#39;</code></pre></div>\n<p>It seems that this is a "Higher order component" that I wrap my app in which will allow my app to use the <em>HTML5 history API</em> to keep my url paths and app-state in sync.</p>\n<p>So I\'ll use it something like <em>this</em> and put subsequent routing stuff in <code class="language-text">App.ts</code> and its sub-components.</p>\n<div class="gatsby-highlight" data-language="tsx"><pre class="language-tsx"><code class="language-tsx"><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BrowserRouter</span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token attr-name">userSession</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>userSession<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>BrowserRouter</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span></code></pre></div>\n<p>So far this doesn\'t do anything, but my app <em>does</em> have a couple distinct routes that I should get working with it:</p>\n<ul>\n<li>a "Landing" page with a sign-in button</li>\n<li>a "Signed in" page for once the user is authenticated</li>\n</ul>\n<p>The <em>React Router</em> <code class="language-text">Route</code> component defines behavior for a path.</p>\n<p>Currently without this router, my "<em>routing</em>" looks like this:</p>\n<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts">userSession<span class="token punctuation">.</span><span class="token function">isUserSignedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token operator">?</span> <span class="token operator">&lt;</span>SignedIn name<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">\'World\'</span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">:</span> <span class="token operator">&lt;</span>Landing userSession<span class="token operator">=</span><span class="token punctuation">{</span>userSession<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span></code></pre></div>\n<p>This is analogous to a HTTP <em>redirect</em> in traditional (non-SPA) terms.</p>\n<p>I can\'t just do:</p>\n<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts">userSession<span class="token punctuation">.</span><span class="token function">isUserSignedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token operator">?</span> <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/signed-in/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>SignedIn<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">:</span> <span class="token operator">&lt;</span>Route path<span class="token operator">=</span><span class="token string">"/landing/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Landing<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></code></pre></div>\n<p>Besides the above totally missing the <em>props</em> I was passing in (easily remedied), this won\'t actually update the path. <code class="language-text">&lt;Route ...&gt;</code> will take the <code class="language-text">path</code> prop and render the <code class="language-text">component</code> <em>if</em> it matches the url path.</p>\n<p>What I can <em>maybe</em> do, is something more like this:</p>\n<div class="gatsby-highlight" data-language="tsx"><pre class="language-tsx"><code class="language-tsx"><span class="token function">updatePathIfMismatch</span><span class="token punctuation">(</span>userSession<span class="token punctuation">.</span><span class="token function">isUserSignedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Route</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/signed-in/<span class="token punctuation">"</span></span> <span class="token attr-name">component</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>SignedIn<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Route</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/landing/<span class="token punctuation">"</span></span> <span class="token attr-name">component</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Landing<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></code></pre></div>\n<p>This would require writing a <code class="language-text">updatePathIfMismatch</code> function which changes the path if it doesn\'t match the user session state.</p>\n<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token keyword">function</span> <span class="token function">updatePathIfMismatch</span> <span class="token punctuation">(</span>isSignedIn<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>isSignedIn<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pathMatches</span><span class="token punctuation">(</span><span class="token string">\'/signed-in/\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span>\n        <span class="token punctuation">}</span>\n        window<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token string">\'/signed-in/\'</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pathMatches</span><span class="token punctuation">(</span><span class="token string">\'/landing/\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span>\n        <span class="token punctuation">}</span>\n        window<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token string">\'/landing/\'</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>I didn\'t bother implementing <code class="language-text">pathMatches</code>, becuase the above approach sucks. You can imagine that it gets a lot more complicated when I have more paths for an authenticated user.</p>\n<p>With respect to routing, <em>auth</em> stuff is a bit of a special case. <em>Most</em> routing would be more like clicking a link on the site (an <code class="language-text">&lt;a href=&quot;...&quot;&gt;</code>) or a <code class="language-text">&lt;Link to=&quot;...&quot;&gt;</code> with <em>React Router</em>. But dealing with authentication, as in this app would use automatic redirects. The above approach should work, <em>but</em> its not really the React way. Its very <em>imperitive</em>, where I want something more <em>declaritive</em>.</p>\n<p>Luckily <a href="https://reacttraining.com/react-router/web/example/auth-workflow"><em>React Router</em> has mechanisms to handle this kinda thing</a>.</p>\n<p>I\'ll adapt a <code class="language-text">PrivateRoute</code> component from their example code which wraps a regular <code class="language-text">Route</code>, but uses the <code class="language-text">&lt;Redirect&gt;</code> component to shoo away un-authenticated users.</p>\n<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> UserSession <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'blockstack\'</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Route<span class="token punctuation">,</span> Redirect<span class="token punctuation">,</span> RouteProps<span class="token punctuation">,</span> RouteComponentProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span>\n\n<span class="token keyword">const</span> LandingRedirect<span class="token punctuation">:</span> React<span class="token punctuation">.</span>StatelessComponent<span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>RouteProps<span class="token operator">>></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    location\n<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    <span class="token operator">&lt;</span>Redirect\n        to<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n            pathname<span class="token punctuation">:</span> <span class="token string">"/landing/"</span><span class="token punctuation">,</span>\n            state<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token keyword">from</span><span class="token punctuation">:</span> location <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">}</span>\n    <span class="token operator">/</span><span class="token operator">></span>\n\n<span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token keyword">extends</span> <span class="token class-name">RouteProps</span> <span class="token punctuation">{</span>\n    userSession<span class="token punctuation">:</span> UserSession<span class="token punctuation">,</span>\n    component<span class="token punctuation">:</span> React<span class="token punctuation">.</span>ComponentType<span class="token operator">&lt;</span>RouteComponentProps<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">>></span> <span class="token operator">|</span> React<span class="token punctuation">.</span>ComponentType<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> PrivateRoute<span class="token punctuation">:</span> React<span class="token punctuation">.</span>StatelessComponent<span class="token operator">&lt;</span>Props<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    component<span class="token punctuation">:</span> Component<span class="token punctuation">,</span>\n    userSession<span class="token punctuation">,</span>\n    <span class="token operator">...</span>rest\n<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> isSignedIn <span class="token operator">=</span> userSession<span class="token punctuation">.</span><span class="token function">isUserSignedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n        <span class="token operator">&lt;</span>Route <span class="token punctuation">{</span><span class="token operator">...</span>rest<span class="token punctuation">}</span>\n            render<span class="token operator">=</span><span class="token punctuation">{</span>props <span class="token operator">=></span> isSignedIn\n                <span class="token operator">?</span> <span class="token operator">&lt;</span>Component <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n                <span class="token punctuation">:</span> <span class="token operator">&lt;</span>LandingRedirect <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n            <span class="token punctuation">}</span>\n        <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre></div>\n<p>It took quite a while to make the TS types work here, but it works.</p>\n<p>And now I\'m getting a bit tired, so gonna call it for now. I didn\'t actually hit anymore of the <em>zero to dapp</em> tutorial, other than sorta doing the Router stuff which they provide more or less without explanation.</p>\n<p>See <a href="https://github.com/zachlysobey/blockstack-app-ts-react/commit/50d2c865f6ee8f0be939a0cf6f26643fe4f95144">this commit</a> for the progress up until this point</p>',frontmatter:{date:"July 07, 2019",path:"/2019-07-07-blockstack-part-2",title:"Building a Blockstack App (part 2)"}}},pathContext:{}}}});
//# sourceMappingURL=path---2019-07-07-blockstack-part-2-675569e4300df506b840.js.map