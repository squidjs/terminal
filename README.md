![](https://i.imgur.com/gcAGPt1.png)

[![Lint Actions Status](https://github.com/QuiiBz/squid/workflows/Lint/badge.svg)](https://github.com/QuiiBz/squid/actions)
[![Build Status](https://travis-ci.com/QuiiBz/squid.svg?branch=canary)](https://travis-ci.com/QuiiBz/squid)
[![Known Vulnerabilities](https://snyk.io/test/github/QuiiBz/squid/badge.svg?targetFile=package.json)](https://snyk.io/test/github/QuiiBz/squid?targetFile=package.json)
[![Quality score](https://www.code-inspector.com/project/4175/score/svg)](https://www.code-inspector.com/project/4175/score/svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/QuiiBz/squid/issues)
----

**Squid** is a terminal emulator, build with new technologies.

## Downloading
**Canary** versions of Squid are availables for download in [releases](https://github.com/QuiiBz/squid/releases)

## Themes and settings
`userData` folder:
* `%APPDATA%` on Windows
* `$XDG_CONFIG_HOME` or `~/.config` on Linux
* `~/Library/Application Support` on macOS

Here is the settings file, located in `userData/settings.squid.json`.

Most of theses settings will apply immediately when saving the file, without need to restart the app.
```
{
  "theme": {
    "name": "default",
    "background": "#090b10",
    "foreground": "#ECEFF1",
    "cursor": "#89DDFF",
    "cursorAccent": "#89DDFF",
    "selection": "#ECEFF1",
    "border": "rgba(0, 0, 0, 0)",
    "black": "#000000",
    "red": "#E54B4B",
    "green": "#9ECE58",
    "yellow": "#FAED70",
    "blue": "#396FE2",
    "magenta": "#BB80B3",
    "cyan": "#2DDAFD",
    "white": "#d0d0d0",
    "brightBlack": "#6b6b6b",
    "brightRed": "#FF5370",
    "brightGreen": "#C3E88D",
    "brightYellow": "#FFCB6B",
    "brightBlue": "#82AAFF",
    "brightMagenta": "#C792EA",
    "brightCyan": "#89DDFF",
    "brightWhite": "#ffffff"
  },
  "cursor": {
    "style": "block",
    "blink": true
  },
  "font": {
    "size": 15,
    "family": "\"DroidSansMono Nerd Font\", \"Fira Code\", monospace"
  },
  "opacity": 0.9,
  "shell": "bash",
  "currentTheme": "material",
  "fastScrollModifier": "shift",
  "webGlRendering": true,
  "vibrancy": {
    "enabled": true,
    "theme": "light",
    "effect": "acrylic",
    "useCustomWindowRefreshMethod": true,
    "maximumRefreshRate": 60,
    "disableOnBlur": true
  },
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
      "keys": "Alt+Left",
      "action": "pane:switchLeft"
    },
    {
      "keys": "Alt+Right",
      "action": "pane:switchRight"
    }
  ]
}
```

## Contributing
First of all, make sure you have NPM or Yarn installed on your system. Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
   - NPM: `npm install`
   - Yarn: `yarn`
3) Launch the development server and the app:
   - NPM: `npm run electron:serve`
   - Yarn: `yarn electron:serve`
   
## License
[MIT](https://choosealicense.com/licenses/mit/)