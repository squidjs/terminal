![](https://i.imgur.com/gcAGPt1.png)

[![Build Status](https://travis-ci.org/QuiiBz/squid.svg?branch=canary)](https://travis-ci.org/QuiiBz/squid)
[![Known Vulnerabilities](https://snyk.io/test/github/QuiiBz/squid/badge.svg?targetFile=package.json)](https://snyk.io/test/github/QuiiBz/squid?targetFile=package.json)
[![Quality score](https://www.code-inspector.com/project/4175/score/svg)](https://www.code-inspector.com/project/4175/score/svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/QuiiBz/squid/issues)
----

**Squid** is a terminal emulator, build with new technologies.

## Download
**Canary** versions of Squid are availables for download in [releases](https://github.com/QuiiBz/squid/releases)

## Contribute
First of all, make sure you have NPM installed on your system. Then :
1) Clone this repo : `git clone https://github.com/QuiiBz/squid`
2) Install the dependencies : `cd squid && npm install`
3) Run `npm run tsc` to build TypeScript to JavaScript
4) In another terminal tab, run `npm start` to launch the app

## Screenshots

### Home page
![](https://i.imgur.com/XrNMD9k.png)

### Terminals
![](https://i.imgur.com/NWbRhjR.png)

### Add/edit host
![](https://i.imgur.com/EIUqjmk.png)

## Themes and settings
You can create and set a theme very easily. Themes are basic JSON files, located in `userData` :
* `%APPDATA%` on Windows
* `$XDG_CONFIG_HOME` or `~/.config` on Linux
* `~/Library/Application Support` on macOS

The default theme is in the settings file, which is located in `userData/settings.squid.json`. More settings are scheduled.
To create a theme, create a new file in `userData` folder, named `<themeName>.theme.json`. Here is the `material` theme for exemple :
```
{
  "name":"material",
  "background":"rgb(41, 45, 62)",
  "foreground":"#ECEFF1",
  "cursor":"#FFCC00",
  "black":"#000000",
  "red":"#E54B4B",
  "green":"#9ECE58",
  "yellow":"#FAED70",
  "blue":"#396FE2",
  "magenta":"#BB80B3",
  "cyan":"#2DDAFD",
  "white":"#d0d0d0",
  "lightBlack":"#6b6b6b",
  "lightRed":"#FF5370",
  "lightGreen":"#C3E88D",
  "lightYellow":"#FFCB6B",
  "lightBlue":"#82AAFF",
  "lightMagenta":"#C792EA",
  "lightCyan":"#89DDFF",
  "lightWhite":"#ffffff"
}
```

Then, to apply your theme, locate the key `currentTheme` in the settings file (`userData/settings.squid.json`), and change it to the name of the theme you created or downloaded. You dont't need to restart, the app watch for changes in the settings file and automatically process the changes.

Where is the settings file, more options are coming :
```
{
  "theme": {
    ...
  },
  "cursor": {
    "style": "block",
    "blink": true
  },
  "font": {
    "size": 13,
    "family": "\"Fira Code\", \"Consolas\", monospace"
  },
  "backgroundImage": {
    "path": "",
    "opacity": 1
  },
  "bash": "",
  "currentTheme": "default",
  "fastScrollModifier": "shift",
  "shortcuts": [
    {
      "keys": "CommandOrControl+Shift+T",
      "action": "pane:open"
    },
    {
      "keys": "CommandOrControl+Shift+W",
      "action": "pane:close"
    },
    {
      "keys": "CommandOrControl+Tab",
      "action": "pane:switch"
    }
  ]
}
```
