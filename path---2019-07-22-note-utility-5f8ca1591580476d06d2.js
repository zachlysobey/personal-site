webpackJsonp([0x8ed8c65b81d6],{359:function(e,t){e.exports={data:{markdownRemark:{html:'<p>I just made a fun command-line function to easily create markdown notes from the command line.</p>\n<p>It creates a new file with a name like <code class="language-text">note_2019-07-22.md</code>, apends a timestamp to it, and opens it in a text editor.</p>\n<p>The editor defaults to <code class="language-text">vim</code> but can also be <code class="language-text">code</code> (for vscode), or whatever you like. If you chose <code class="language-text">vim</code> (or <code class="language-text">vi</code>) it will automatically put you at the end of the file.</p>\n<ul>\n<li>\n<p><code class="language-text">note</code></p>\n<p><em>(defaults to <code class="language-text">vim</code>)</em></p>\n</li>\n<li>\n<p><code class="language-text">note code</code></p>\n</li>\n<li>\n<p><code class="language-text">note vim</code></p>\n</li>\n</ul>\n<p>I named it "note".</p>\n<h2>Source</h2>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">function note {\n    fileName=&quot;note_$(date +%F).md&quot;\n\n    echo $(date +%c) &gt;&gt; $fileName\n    echo &quot;========================&quot; &gt;&gt; $fileName\n    echo &quot;&quot; &gt;&gt; $fileName\n    echo &quot;&quot; &gt;&gt; $fileName\n\n    editor=${1:-&quot;vi&quot;}\n\n    case &quot;$editor&quot; in\n    &quot;vi&quot;) editor_args=&quot;+$&quot; ;;\n    &quot;vim&quot;) editor_args=&quot;+$&quot; ;;\n    *) editor_args=&quot;&quot; ;;\n    esac\n\n    $editor $editor_args $fileName\n}</code></pre>\n      </div>\n<h2>Example Usage</h2>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">$ note vim</code></pre>\n      </div>\n<blockquote>\n<p><em>(editor opens)</em></p>\n</blockquote>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">$ ls\nnote_2019-07-22.md\n\n$ cat note_2019-07-22.md\nMon Jul 22 01:13:28 2019\n========================</code></pre>\n      </div>',frontmatter:{date:"July 22, 2019",path:"/2019-07-22-note-utility",title:"A fun little CLI utility for writing markdown notes"}}},pathContext:{}}}});
//# sourceMappingURL=path---2019-07-22-note-utility-5f8ca1591580476d06d2.js.map