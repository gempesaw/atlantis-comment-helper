# atlantis-comment-helper :honk:

if you use atlantis and github, you may find yourself typing the same thing over
and over again, with some variations, but not too many variations. this gets
laborious, especially if terraform is not your best friend and you need to do a
lot of plan/apply cycles.

this chrome extension tries to regex for the atlantis commands on the current
issue, and creates buttons that put the comment in for you. maybe later it'll
have keyboard shortcuts.

![](assets/at-least-one-screenshot-or-video-is-required.png)

## usage

install the [chrome extension][]. go to a Github issue with atlantis commands in
it and scroll to the bottom. click a button.

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

[chrome extension]: https://chrome.google.com/webstore/detail/buildkite-new-build-branc/fgecbpogdmgfgaoodjcbjbhacamojkee/
