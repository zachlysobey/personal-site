---
path: "/2019-08-29-git-merkle-tree-fun"
date: "2019-08-29"
title: "Having some fun with git commit hashes"
tags: ["programming", "git", "cryptography"]
---

I've been brewing a fun idea for a while, and think its time to get a start.

Its around git commit hashes and history.

I think this idea is best illustrated with an example.

Currently, if I look at my git history for this project using `git log --oneline` it looks something like this:

```
1b04167 (content) fix markdown code-block language in 2019-07-22
2de6f6a (display) update header-nav styles
ef2786e (chore) replace gatsby starter package.json content
5cdf6a2 (chore) fix package.json repository field
21dbc9b (content) add post about 'notes' util
57b2a7e (content) 'finish' 2019-07-07 blockstack part 2
3a9aed4 (content) continue work on 2019-07-07 blockstack part 2
0414b17 (content) start authoring 2019-07-07 blockstack part 2
b48c2a6 (content) fix typo
```

Note the *random* commit hashes (`1b04167`, `2de6f6a`, ...).

I want to have some fun with this. I'd like to be able to have the git history look like:

```
0000000 (content) fix markdown code-block language in 2019-07-22
0000000 (display) update header-nav styles
0000000 (chore) replace gatsby starter package.json content
0000000 (chore) fix package.json repository field
0000000 (content) add post about 'notes' util
0000000 (content) 'finish' 2019-07-07 blockstack part 2
0000000 (content) continue work on 2019-07-07 blockstack part 2
0000000 (content) start authoring 2019-07-07 blockstack part 2
0000000 (content) fix typo
```

or

```
1234567 (content) fix markdown code-block language in 2019-07-22
2345678 (display) update header-nav styles
3456789 (chore) replace gatsby starter package.json content
4567890 (chore) fix package.json repository field
5678901 (content) add post about 'notes' util
6789012 (content) 'finish' 2019-07-07 blockstack part 2
7890123 (content) continue work on 2019-07-07 blockstack part 2
8901234 (content) start authoring 2019-07-07 blockstack part 2
9012345 (content) fix typo
```

Really I'd like it to be flexible to create *any* target hash or pattern of hashes, etc... But that's probably out of scope for this first iteration. Just a leading zero or two would be pretty cool to pull off.

A few things to note:

- the hashes are actually much longer than the abbreviated version in the `--oneline` git log output. (`1b04167441c746dd26e88c42eab692f635c8a1b4` for example)
- these commit *hashes* are cryptographic SHA1 hashes of the commit content.
- the commit content includes the code contained at that commit, the parent commit info, the commit message, etc...
- *any* change to a commit contents will create a totally new *random* commit hash. 

We can *amend* a commit over and over making a tiny change and then updating the commit, each time essentially rolling the dice on a new commit hash. If we do this enough times we can theoretically get whatever commit hash we want, though if we target too many digits, it will quickly take too much computational power than we have. This process is essentially the same "proof-of-work" process that Bitcoin uses to mine blocks. As an example, if we want only want to ensure a `0` as the first digit of the hash, we would, on average, need to "roll the dice" 16 times. (this is hexidecimal: `0`-`f`). 2 leading zeros would be 16^2 or 256 dice rolls. 5 leading zeros is 16^5, which is odds worse than one in a million! Its likely we'll not get quite up to 5 digits in this project, but we'll try to push the boundaries.

Lets dive in and write some code. I'm creating a new git repo named `git-rehasher`.

```
$ mkdir git-rehasher
$ cd git-rehasher
$ git init
```

And for now, lets create a blank README file and get our first commit

```
$ touch README.md
$ git add .
$ git commit -m "add readme"
```

Lets check out our commit hash

```
$ git log --oneline
9320f6a (HEAD -> master) add readme
```

To illustrate what I want to do with a script, I'm going to manually get that first digit to be a zero by making small changes to the commit.

We can use `git commit --amend` to update a previous commit. (`--am` can be used as shorthand for `--amend`, but I'm using the long form for clarity)

```
$ git commit --amend -m "add readme take 2"
$ git log --oneline
748f6bd (HEAD -> master) add readme take 2
```

I still don't have a zero :(

But I *can* repeat this process, changing the commit message, which will change the commit hash until I get a zero:

I'll change the commit in a methodical way, by appending a number to the message which I'll increment each time I don't get a hash that I like. Any small change like this ensures a new, unique commit hash each time. In cryptographic jargon we call this "incrementing a nonce" so I'll use that terminology.

```
$ git commit --amend -m "add readme (nonce: 2)"
# 60a4451
$ git commit --amend -m "add readme (nonce: 3)"
# ac76260
$ git commit --amend -m "add readme (nonce: 4)"
# 855cc36
$ git commit --amend -m "add readme (nonce: 5)"
# 1db29c6
$ git commit --amend -m "add readme (nonce: 6)"
# 1759cc1
$ git commit --amend -m "add readme (nonce: 7)"
# a29a1da
$ git commit --amend -m "add readme (nonce: 8)"
# 7c2489d
$ git commit --amend -m "add readme (nonce: 9)"
# 095467e
```

By our 9th try, we get that leading zero we were looking for! `095467e`

I'm not much of a shell scripter, but lets figure out how to automate this.

First we want a way to *test* whether the commit at our `HEAD` matches are target output. In this case, checking if the commit hash has a leading zero.

Lets start writing a little script

Create a `re-hash.sh` file and give execute permissions on it:

```
$ touch re-hash.sh
$ chmod +x ./re-hash.sh
```

Now lets put some stuff in there. I'll use `git rev-parse HEAD` to gert the current commit hash.

```bash
#!/bin/bash

git rev-parse HEAD
```

Lets run it to make sure it works:

```
$ ./re-hash.sh       
095467e82a3e93b3a8370a5e536799f30f02e819% 
```

All-right, we're off to a good start. Lets try to put that hash into a variable. (baby steps)

```bash
#!/bin/bash

commit_hash=$(git rev-parse HEAD)
echo "commit hash: $commit_hash"
```

And execute it:

```
$ ./re-hash.sh       
095467e82a3e93b3a8370a5e536799f30f02e819% 
```

Cool it still works.

Now to test the hash:

```bash
#!/bin/bash

commit_hash=$(git rev-parse HEAD)
echo commit hash: $commit_hash

if [[ $commit_hash == 0* ]] ;
then
    echo "has leading zero"
else
    echo "no leading zero"
fi
```

```
./re-hash.sh
commit_hash=095467e82a3e93b3a8370a5e536799f30f02e819
has leading zero
```

Progress!

I want to commit this progress, but it'd be cool to have another leading zero in the commit message, and I don't want to do it again manually. Lets make our script actually commit, and amend in a loop until it gets that leading zero. Actually... lets update it to be *two* leading zeros from now on.

```bash
#!/bin/bash

commit_hash=$(git rev-parse HEAD)
echo "commit hash: $commit_hash"

nonce=0
while [[ $commit_hash != 00* ]]
do
  git commit --amend -m "commiting! (nonce=$nonce)" >/dev/null
  commit_hash=$(git rev-parse HEAD)
  echo "$commit_hash (nonce: $nonce)"
  ((nonce++))
done
```

This script is far from perfect but I think I'm happy with it for a first pass. It will *rewrite* the most recent commit message until it matches the given pattern.

```
$ ./re-hash.sh
commit hash: 1f311397e86379dcd5850ffb605a266aacb2ba60
9d7cebea2a71f3966ba0078878f718aab4bfc07e (nonce: 0)
6141daafa01a933c1edf25105d573889c9adb216 (nonce: 1)
# (omitted a bunch of output lines here...)
4d936e0c96c1099bd5dadd9c2a9457b985d5f26c (nonce: 179)
37dbcf57988d345d7f46d8c567af2d3bc008b712 (nonce: 180)
00db7759a8555d2fd279ee0020942b99fddea64a (nonce: 181)
```

**See https://github.com/zachlysobey/git-rehasher for the final product**

## What's next?

- re-use the original commit message, appending a incrementing nonce
- option to re-write entire commit history rather than just a single commit at a time
- configurable target pattern as a CLI argument
- multi-line pattern support
- Usage as a precommit hook
- performance optimizations? Just 2 leading characters takes a few seconds, and any more quickly becomes too much.
