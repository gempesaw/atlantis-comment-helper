# atlantis-comment-helper :honk:

if you use atlantis to plan and apply your terraform in github, you may find
yourself typing the same thing over and over again, with some variations for
project and target, but not too many variations. this gets laborious, especially
if terraform isn't your bestie and you need to do a lot of plan/apply cycles.

this chrome extension regexes the content on a Github pull request page for the
Atlantis commands, and just creates buttons that type and submit the comment in
for you. maybe later it'll have keyboard shortcuts instead of requiring mouse
movement.

**N.B.**: you use this extension at your own risk; no guarantees of fitness for
any purpose. aka, i'm not responsible if it runs 100 plans or 20 applies in a
row or whatever! i won't make it do that on purpose of course, but i'm a
mediocre programmer at best, soooo!

![](assets/screenshot1.png)

## usage

install the [chrome extension][]. go to a Github issue with atlantis commands in
it and scroll to the bottom. click a button.

there's also a [firefox extension][].

## manual installation

1. clone the repo
1. go to chrome://extensions/
1. `load unpacked extension`
1. pick the `extension` directory where you cloned this thing

## deployment

```
$ cd extension && zip -r Archive.zip .
```

upload the extension in the chrome developer dashboard

## license

MIT

[chrome extension]: https://chrome.google.com/webstore/detail/mlmkhgibkaadhgkbpkmcckbdpfofnldd
[firefox extension]: https://addons.mozilla.org/en-US/firefox/addon/atlantis-comment-helper/
