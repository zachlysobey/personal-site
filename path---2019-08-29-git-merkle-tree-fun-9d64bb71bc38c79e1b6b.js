webpackJsonp([0x8d4101949b92],{361:function(a,e){a.exports={data:{markdownRemark:{html:'<p>I\'ve been brewing a fun idea for a while, and think its time to get a start.</p>\n<p>Its around git commit hashes and history.</p>\n<p>I think this idea is best illustrated with an example.</p>\n<p>Currently, if I look at my git history for this project using <code class="language-text">git log --oneline</code> it looks something like this:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">1b04167 (content) fix markdown code-block language in 2019-07-22\n2de6f6a (display) update header-nav styles\nef2786e (chore) replace gatsby starter package.json content\n5cdf6a2 (chore) fix package.json repository field\n21dbc9b (content) add post about &#39;notes&#39; util\n57b2a7e (content) &#39;finish&#39; 2019-07-07 blockstack part 2\n3a9aed4 (content) continue work on 2019-07-07 blockstack part 2\n0414b17 (content) start authoring 2019-07-07 blockstack part 2\nb48c2a6 (content) fix typo</code></pre></div>\n<p>Note the <em>random</em> commit hashes (<code class="language-text">1b04167</code>, <code class="language-text">2de6f6a</code>, ...).</p>\n<p>I want to have some fun with this. I\'d like to be able to have the git history look like:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">0000000 (content) fix markdown code-block language in 2019-07-22\n0000000 (display) update header-nav styles\n0000000 (chore) replace gatsby starter package.json content\n0000000 (chore) fix package.json repository field\n0000000 (content) add post about &#39;notes&#39; util\n0000000 (content) &#39;finish&#39; 2019-07-07 blockstack part 2\n0000000 (content) continue work on 2019-07-07 blockstack part 2\n0000000 (content) start authoring 2019-07-07 blockstack part 2\n0000000 (content) fix typo</code></pre></div>\n<p>or</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">1234567 (content) fix markdown code-block language in 2019-07-22\n2345678 (display) update header-nav styles\n3456789 (chore) replace gatsby starter package.json content\n4567890 (chore) fix package.json repository field\n5678901 (content) add post about &#39;notes&#39; util\n6789012 (content) &#39;finish&#39; 2019-07-07 blockstack part 2\n7890123 (content) continue work on 2019-07-07 blockstack part 2\n8901234 (content) start authoring 2019-07-07 blockstack part 2\n9012345 (content) fix typo</code></pre></div>\n<p>Really I\'d like it to be flexible to create <em>any</em> target hash or pattern of hashes, etc... But that\'s probably out of scope for this first iteration. Just a leading zero or two would be pretty cool to pull off.</p>\n<p>A few things to note:</p>\n<ul>\n<li>the hashes are actually much longer than the abbreviated version in the <code class="language-text">--oneline</code> git log output. (<code class="language-text">1b04167441c746dd26e88c42eab692f635c8a1b4</code> for example)</li>\n<li>these commit <em>hashes</em> are cryptographic SHA1 hashes of the commit content.</li>\n<li>the commit content includes the code contained at that commit, the parent commit info, the commit message, etc...</li>\n<li><em>any</em> change to a commit contents will create a totally new <em>random</em> commit hash. </li>\n</ul>\n<p>We can <em>amend</em> a commit over and over making a tiny change and then updating the commit, each time essentially rolling the dice on a new commit hash. If we do this enough times we can theoretically get whatever commit hash we want, though if we target too many digits, it will quickly take too much computational power than we have. This process is essentially the same "proof-of-work" process that Bitcoin uses to mine blocks. As an example, if we want only want to ensure a <code class="language-text">0</code> as the first digit of the hash, we would, on average, need to "roll the dice" 16 times. (this is hexidecimal: <code class="language-text">0</code>-<code class="language-text">f</code>). 2 leading zeros would be 16^2 or 256 dice rolls. 5 leading zeros is 16^5, which is odds worse than one in a million! Its likely we\'ll not get quite up to 5 digits in this project, but we\'ll try to push the boundaries.</p>\n<p>Lets dive in and write some code. I\'m creating a new git repo named <code class="language-text">git-rehasher</code>.</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ mkdir git-rehasher\n$ cd git-rehasher\n$ git init</code></pre></div>\n<p>And for now, lets create a blank README file and get our first commit</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ touch README.md\n$ git add .\n$ git commit -m &quot;add readme&quot;</code></pre></div>\n<p>Lets check out our commit hash</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ git log --oneline\n9320f6a (HEAD -&gt; master) add readme</code></pre></div>\n<p>To illustrate what I want to do with a script, I\'m going to manually get that first digit to be a zero by making small changes to the commit.</p>\n<p>We can use <code class="language-text">git commit --amend</code> to update a previous commit. (<code class="language-text">--am</code> can be used as shorthand for <code class="language-text">--amend</code>, but I\'m using the long form for clarity)</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ git commit --amend -m &quot;add readme take 2&quot;\n$ git log --oneline\n748f6bd (HEAD -&gt; master) add readme take 2</code></pre></div>\n<p>I still don\'t have a zero :(</p>\n<p>But I <em>can</em> repeat this process, changing the commit message, which will change the commit hash until I get a zero:</p>\n<p>I\'ll change the commit in a methodical way, by appending a number to the message which I\'ll increment each time I don\'t get a hash that I like. Any small change like this ensures a new, unique commit hash each time. In cryptographic jargon we call this "incrementing a nonce" so I\'ll use that terminology.</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ git commit --amend -m &quot;add readme (nonce: 2)&quot;\n# 60a4451\n$ git commit --amend -m &quot;add readme (nonce: 3)&quot;\n# ac76260\n$ git commit --amend -m &quot;add readme (nonce: 4)&quot;\n# 855cc36\n$ git commit --amend -m &quot;add readme (nonce: 5)&quot;\n# 1db29c6\n$ git commit --amend -m &quot;add readme (nonce: 6)&quot;\n# 1759cc1\n$ git commit --amend -m &quot;add readme (nonce: 7)&quot;\n# a29a1da\n$ git commit --amend -m &quot;add readme (nonce: 8)&quot;\n# 7c2489d\n$ git commit --amend -m &quot;add readme (nonce: 9)&quot;\n# 095467e</code></pre></div>\n<p>By our 9th try, we get that leading zero we were looking for! <code class="language-text">095467e</code></p>\n<p>I\'m not much of a shell scripter, but lets figure out how to automate this.</p>\n<p>First we want a way to <em>test</em> whether the commit at our <code class="language-text">HEAD</code> matches are target output. In this case, checking if the commit hash has a leading zero.</p>\n<p>Lets start writing a little script</p>\n<p>Create a <code class="language-text">re-hash.sh</code> file and give execute permissions on it:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ touch re-hash.sh\n$ chmod +x ./re-hash.sh</code></pre></div>\n<p>Now lets put some stuff in there. I\'ll use <code class="language-text">git rev-parse HEAD</code> to gert the current commit hash.</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/bin/bash</span>\n\n<span class="token function">git</span> rev-parse HEAD</code></pre></div>\n<p>Lets run it to make sure it works:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ ./re-hash.sh       \n095467e82a3e93b3a8370a5e536799f30f02e819% </code></pre></div>\n<p>All-right, we\'re off to a good start. Lets try to put that hash into a variable. (baby steps)</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/bin/bash</span>\n\ncommit_hash<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse HEAD<span class="token variable">)</span></span>\n<span class="token keyword">echo</span> <span class="token string">"commit hash: <span class="token variable">$commit_hash</span>"</span></code></pre></div>\n<p>And execute it:</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ ./re-hash.sh       \n095467e82a3e93b3a8370a5e536799f30f02e819% </code></pre></div>\n<p>Cool it still works.</p>\n<p>Now to test the hash:</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/bin/bash</span>\n\ncommit_hash<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse HEAD<span class="token variable">)</span></span>\n<span class="token keyword">echo</span> commit hash: <span class="token variable">$commit_hash</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$commit_hash</span> <span class="token operator">==</span> 0* <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">;</span>\n<span class="token keyword">then</span>\n    <span class="token keyword">echo</span> <span class="token string">"has leading zero"</span>\n<span class="token keyword">else</span>\n    <span class="token keyword">echo</span> <span class="token string">"no leading zero"</span>\n<span class="token keyword">fi</span></code></pre></div>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">./re-hash.sh\ncommit_hash=095467e82a3e93b3a8370a5e536799f30f02e819\nhas leading zero</code></pre></div>\n<p>Progress!</p>\n<p>I want to commit this progress, but it\'d be cool to have another leading zero in the commit message, and I don\'t want to do it again manually. Lets make our script actually commit, and amend in a loop until it gets that leading zero. Actually... lets update it to be <em>two</em> leading zeros from now on.</p>\n<div class="gatsby-highlight" data-language="bash"><pre class="language-bash"><code class="language-bash"><span class="token shebang important">#!/bin/bash</span>\n\ncommit_hash<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse HEAD<span class="token variable">)</span></span>\n<span class="token keyword">echo</span> <span class="token string">"commit hash: <span class="token variable">$commit_hash</span>"</span>\n\nnonce<span class="token operator">=</span>0\n<span class="token keyword">while</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$commit_hash</span> <span class="token operator">!=</span> 00* <span class="token punctuation">]</span><span class="token punctuation">]</span>\n<span class="token keyword">do</span>\n  <span class="token function">git</span> commit --amend -m <span class="token string">"commiting! (nonce=<span class="token variable">$nonce</span>)"</span> <span class="token operator">></span>/dev/null\n  commit_hash<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse HEAD<span class="token variable">)</span></span>\n  <span class="token keyword">echo</span> <span class="token string">"<span class="token variable">$commit_hash</span> (nonce: <span class="token variable">$nonce</span>)"</span>\n  <span class="token variable"><span class="token punctuation">((</span>nonce<span class="token operator">++</span><span class="token punctuation">))</span></span>\n<span class="token keyword">done</span></code></pre></div>\n<p>This script is far from perfect but I think I\'m happy with it for a first pass. It will <em>rewrite</em> the most recent commit message until it matches the given pattern.</p>\n<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ ./re-hash.sh\ncommit hash: 1f311397e86379dcd5850ffb605a266aacb2ba60\n9d7cebea2a71f3966ba0078878f718aab4bfc07e (nonce: 0)\n6141daafa01a933c1edf25105d573889c9adb216 (nonce: 1)\n# (omitted a bunch of output lines here...)\n4d936e0c96c1099bd5dadd9c2a9457b985d5f26c (nonce: 179)\n37dbcf57988d345d7f46d8c567af2d3bc008b712 (nonce: 180)\n00db7759a8555d2fd279ee0020942b99fddea64a (nonce: 181)</code></pre></div>\n<p><strong>See <a href="https://github.com/zachlysobey/git-rehasher">https://github.com/zachlysobey/git-rehasher</a> for the final product</strong></p>\n<h2>What\'s next?</h2>\n<ul>\n<li>re-use the original commit message, appending a incrementing nonce</li>\n<li>option to re-write entire commit history rather than just a single commit at a time</li>\n<li>configurable target pattern as a CLI argument</li>\n<li>multi-line pattern support</li>\n<li>Usage as a precommit hook</li>\n<li>performance optimizations? Just 2 leading characters takes a few seconds, and any more quickly becomes too much.</li>\n</ul>',frontmatter:{date:"August 29, 2019",path:"/2019-08-29-git-merkle-tree-fun",title:"Having some fun with git commit hashes"}}},pathContext:{}}}});
//# sourceMappingURL=path---2019-08-29-git-merkle-tree-fun-9d64bb71bc38c79e1b6b.js.map