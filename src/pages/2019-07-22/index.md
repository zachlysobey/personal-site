---
path: "/2019-07-22-note-utility"
date: "2019-07-22"
title: "A fun little CLI utility for writing markdown notes"
tags: ["programming", "shell", "cli", "markdown"]
---

I just made a fun command-line function to easily create markdown notes from the command line.

It creates a new file with a name like `note_2019-07-22.md`, apends a timestamp to it, and opens it in a text editor.

The editor defaults to `vim` but can also be `code` (for vscode), or whatever you like. If you chose `vim` (or `vi`) it will automatically put you at the end of the file.

-   `note`
    
    *(defaults to `vim`)*
- `note code`
- `note vim`

I named it "note".

## Source

```shell
function note {
    fileName="note_$(date +%F).md"

    echo $(date +%c) >> $fileName
    echo "========================" >> $fileName
    echo "" >> $fileName
    echo "" >> $fileName

    editor=${1:-"vi"}

    case "$editor" in
    "vi") editor_args="+$" ;;
    "vim") editor_args="+$" ;;
    *) editor_args="" ;;
    esac

    $editor $editor_args $fileName
}
```

## Example Usage

```
$ note vim
```

> *(editor opens)*

```
$ ls
note_2019-07-22.md

$ cat note_2019-07-22.md
Mon Jul 22 01:13:28 2019
========================
```
