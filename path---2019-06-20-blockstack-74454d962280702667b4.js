webpackJsonp([0xcdad75e9a07c],{355:function(a,n){a.exports={data:{markdownRemark:{html:'<blockquote>\n<p>Long time no see, Blog.</p>\n</blockquote>\n<p>I had a short day at work today (sorta sick), but want to do some OSS stuff.\nAlso this is maybe gonna be my first real project on a new personal computer.\nI got a 13" MacBook pro, the less-expensive version, no fancy touchbar.</p>\n<h2>Blockstack</h2>\n<p>I\'ve recently become aware of a organization named "Blockstack".</p>\n<blockquote>\n<p><a href="https://blockstack.org/">https://blockstack.org/</a></p>\n</blockquote>\n<p>In short, they are trying to re-imagine the internet, using decentralized technology like blockchain.</p>\n<p><em>This would be a good time to read up on Blockstack. They have some good YouTube videos too!</em></p>\n<h3>Learnin\' stuff</h3>\n<p>So far, my only real experience here is having done their <a href="https://docs.blockstack.org/browser/hello-blockstack">10-minute "Hello Blockstack" tutorial</a></p>\n<p>But that was pretty basic.</p>\n<p>I think I\'ll take the next step by skimming the (45 minute) <a href="https://docs.blockstack.org/develop/zero_to_dapp_1.html">Zero to DApp tutorial at docs.blockstack.org</a>.</p>\n<p><strong>Lesson 1</strong>: Both these tutorials use this yeoman app generator thinggy</p>\n<blockquote>\n<p><a href="https://github.com/blockstack/blockstack-app-generator">https://github.com/blockstack/blockstack-app-generator</a></p>\n</blockquote>\n<p>Honestly I don\'t think I\'m the biggest fan from what I saw in "Hello Blockstack". The generated code is too low-level (DOM manipulation, etc...)-- I want a bit more abstraction. Thus, skipping that entirely and instead starting with <code class="language-text">create-react-app</code>.</p>\n<p><strong>Lesson 2</strong>: I can get this sweet T-Shirt for makin\' Apps? Oh Boy!</p>\n<p><img src="https://docs.blockstack.org/develop/images/tshirt-blank.png" alt="blockstack tshirt"></p>\n<p><strong>Lesson 3</strong>: To build something interesting, you probably need to integrate one-or-more blockstack services:</p>\n<p>Ex:</p>\n<ul>\n<li>Blockstack Browser (<a href="https://browser.blockstack.org">https://browser.blockstack.org</a>)</li>\n<li>Gaia data storage hub (<a href="https://hub.blockstack.org/">https://hub.blockstack.org/</a>)</li>\n</ul>\n<p>As I understand it, Gaia is roughly equivalent to an Amazon S3 kind of product, but of course, distributed, secure, etc...</p>\n<p>That is probably the product we\'re gonna use here first.</p>\n<p><strong>Lesson 4</strong>: Actually, the <a href="https://github.com/blockstack/blockstack-app-generator">blockstack app generator</a> has a react mode too! Maybe I should try that...</p>\n<blockquote>\n<p><code class="language-text">$ yo blockstack:react</code></p>\n</blockquote>\n<p>But that seems to not be set up with Typescript out of the box.</p>\n<p><strong>Lesson 5</strong> Looking at their sample-app (Animal Kingdom) I see its probably the project structure I want. Typescript, react, etc...</p>\n<blockquote>\n<p><a href="https://github.com/blockstack/animal-kingdom/blob/master/package.json">https://github.com/blockstack/animal-kingdom/blob/master/package.json</a></p>\n</blockquote>\n<p><em>But its *LIES</em> (lol j/k). But.. it doesn\'t appear like TS is actually used in the project.</p>\n<p>I tried to be a good citizen and opened an <a href="https://github.com/blockstack/animal-kingdom/issues/239">issue on GitHub</a>. Not a good enough citizen to open a PR though. <code class="language-text">¯\\_(ツ)_/¯</code></p>\n<h2>Writing a DApp</h2>\n<p>I\'m like half-way through that tutorial, and they\'re about to start getting into the actual code.</p>\n<blockquote>\n<p><a href="https://docs.blockstack.org/develop/zero_to_dapp_3.html">https://docs.blockstack.org/develop/zero<em>to</em>dapp_3.html</a></p>\n</blockquote>\n<p>This seems a good time to get started.</p>\n<p>I\'ve decided I\'m not using their demo project, which may be a mistake, but <code class="language-text">¯\\_(ツ)_/¯</code>.</p>\n<h3>Bootstrapping</h3>\n<p><em>In the content below, I\'ll be working with a fresh git repo. See the final result here:</em></p>\n<blockquote>\n<p><a href="https://github.com/zachlysobey/blockstack-app-ts-react">https://github.com/zachlysobey/blockstack-app-ts-react</a></p>\n</blockquote>\n<p>Lets start our Typescript + React app.</p>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">$ yarn create react-app blockstack-app-ts-react --typescript</code></pre>\n      </div>\n<p>That invokes <em>create-react-app</em> to generate a pretty fully formed React app.</p>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">$ cd blockstack-app-ts-react/\n$ tree -I &#39;node_modules|\\.git&#39; -a\n.\n├── .gitignore\n├── README.md\n├── package.json\n├── public\n│   ├── favicon.ico\n│   ├── index.html\n│   └── manifest.json\n├── src\n│   ├── App.css\n│   ├── App.test.tsx\n│   ├── App.tsx\n│   ├── index.css\n│   ├── index.tsx\n│   ├── logo.svg\n│   ├── react-app-env.d.ts\n│   └── serviceWorker.ts\n├── tsconfig.json\n└── yarn.lock\n\n2 directories, 16 files</code></pre>\n      </div>\n<p>The next step is to actually get this working with Blockstack.</p>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">$ yarn add blockstack</code></pre>\n      </div>\n<p>That adds <code class="language-text">blockstack</code> to our <code class="language-text">package.json</code>.</p>\n<div class="gatsby-highlight" data-language="diff">\n      <pre class="language-diff"><code class="language-diff"><span class="token inserted">+    "blockstack": "^19.2.1",</span></code></pre>\n      </div>\n<p>I <em>think</em> thats all I need to get started.</p>\n<h3>Integrating blockstack with react</h3>\n<p>The animal kindom app starts by creating a <code class="language-text">UserSession</code> instance and using it in their <code class="language-text">App.jsx</code>.</p>\n<p>They use <code class="language-text">class</code> component syntax, which I tend <em>not</em> to use, so instead, I\'ll <em>inject</em> the instance as Props.</p>\n<p>Here\'s the relevant code:</p>\n<p><strong><code class="language-text">src/index.tsx</code></strong>:</p>\n<div class="gatsby-highlight" data-language="tsx">\n      <pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> UserSession <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'blockstack\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> userSession <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token attr-name">userSession</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>userSession<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> $root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> $root<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><strong><code class="language-text">src/App.tsx</code></strong>:</p>\n<div class="gatsby-highlight" data-language="tsx">\n      <pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> UserSession <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'blockstack\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">interface</span> <span class="token class-name">AppProps</span> <span class="token punctuation">{</span>\n  userSession<span class="token punctuation">:</span> UserSession\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> App<span class="token punctuation">:</span> React<span class="token punctuation">.</span><span class="token constant">FC</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AppProps</span><span class="token punctuation">></span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  userSession\n<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>App<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token operator">...</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>I should probably elaborate a bunch more on the next step. But it took a fair amount of effort from this point, to a proper Blockstack "Hello world"</p>\n<p>See the following commit for the necessary code</p>\n<blockquote>\n<p><a href="https://github.com/zachlysobey/blockstack-app-ts-react/commit/bc053bfcdbf9b4f80ecdcec0f99eb07b0771d22b">https://github.com/zachlysobey/blockstack-app-ts-react/commit/bc053bfcdbf9b4f80ecdcec0f99eb07b0771d22b</a></p>\n</blockquote>\n<p>Some interesting points:</p>\n<ul>\n<li>In order for sign-in to Blockstack to work from a local environment, a bunch of CORS stuff is required. I just liberally <em>stole</em> code from the animal kingdom project. Namely their <code class="language-text">/cors</code> code and <code class="language-text">/src/setupProxy.js</code>. I think I likely took more than is actually required. I can clean this up later perhaps.</li>\n<li>The sign-in flow, as far as I\'ve seen, works with old-school page redirects, and <code class="language-text">window.location =</code> etc...</li>\n<li>I\'m now passing an <code class="language-text">AppConfig</code> object to my <code class="language-text">UserSession</code> constructor. Not really sure exactly how this piece works yet. Something about requesting permissions for the app when you sign-in.</li>\n</ul>\n<h2>Signing off for now</h2>\n<p>I maybe didn\'t get as far as I wanted or expected. That 45 minute tutorial took at least a couple hours of my time, but I was also writing this, and just generally tinkering. I think I learn better that way, as opposed to blindly following someone elses instructions.</p>\n<p>Hopefully I\'ll write another installment of this, and keep interating. Check back soon!</p>',frontmatter:{date:"June 20, 2019",path:"/2019-06-20-blockstack",title:"Building a Blockstack App"}}},pathContext:{}}}});
//# sourceMappingURL=path---2019-06-20-blockstack-74454d962280702667b4.js.map