<p align="center">
    <img src="https://i.imgur.com/L5TUf4J.png" width="100" />
</p>

<p align="center">
    <a href="https://github.com/QuiiBz/squid/actions">
        <img src="https://github.com/QuiiBz/squid/workflows/Lint/badge.svg" />
    </a>
    <a href="https://travis-ci.com/QuiiBz/squid">
        <img src="https://github.com/QuiiBz/squid/workflows/CI/badge.svg?branch=canary" />
    </a>
    <a href="https://github.com/QuiiBz/squid/issues">
        <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
    </a>
</p>

**Squid** is a Shell and SSH terminal emulator, with **end-to-end encryption** for SSH Hosts in the [cloud](#cloud).

We use [Electron](https://electronjs.org) and [ReactJS](https://reactjs.org). Everything is written in [TypeScript](https://typescriptlang.org).

<p align="center">
    <img src="https://i.imgur.com/PwCDVYx.png" />
</p>

## Table of content
- [Downloading](#downloading)
- [Save SSH Hosts to the cloud](#cloud)
- [App settings](#settings)
- [Contributing](#contributing)
- [Licence](#licence)

## Downloading
**Canary** versions of Squid will be soon available for download in [releases](https://github.com/QuiiBz/squid/releases).

Please report any issues or new features you wish to see for Squid.

## Cloud
You can save SSH Hosts in a remote server, to make them available on all the computers you use. They are then linked to your account on this server. The server is called [Squid Cloud](https://github.com/squidjs/cloud).

You can choose to use our server (this is the default configuration), or you can **self-host** it. See bellow for more information.

More information coming soon...

## Settings
The settings file is located in the `userData` folder.

Depending on your OS, `userData` correspond to:
* `%APPDATA%/squid` on Windows
* `~/.config/squid` on Linux
* `~/Library/Application Support/squid` on macOS

Below is the default settings file, located in `userData/squid.json`.
Most of these settings will apply immediately when saving the file, without the need to restart the app.

<details>
    <summary>Example settings file</summary>
    <pre>{
  "theme": {
    "background": "rgba(9, 11, 16, 0.9)",
    "border": "#37474F",
    "text": "#6b6b6b",
    "textHover": "#d0d0d0",
    "foreground": "#ECEFF1",
    "cursor": "#82AAFF",
    "cursorAccent": "#000000",
    "selection": "#82AAFF",
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
  "defaultShell": {
    "name": "Default",
    "path": "/bin/zsh"
  },
  "shells": [
    {
      "name": "ZSH",
      "path": "/bin/zsh"
    },
    {
      "name": "Bash",
      "path": "/bin/bash"
    }
  ],
  "webGlRendering": true,
  "copyOnSelected": true,
  "restoreWindowPosition": true,
  "tabsIcons": true,
  "altClickMoveCursor": true,
  "vibrancy": true,
  "bell": {
    "enabled": false,
    "sound": ""
  },
  "cursor": {
    "style": "block",
    "blink": true,
    "width": 1
  },
  "font": {
    "size": 14,
    "family": "monospace",
    "weight": "normal",
    "weightBold": "bold",
    "letterSpacing": 0,
    "lineHeight": 1
  },
  "scroll": {
    "sensitivity": 1,
    "fastScrollSensitivity": 5,
    "fastScrollModifier": "shift"
  },
  "backgroundImage": {
    "enabled": false,
    "opacity": 0.5,
    "image": ""
  },
  "shortcuts": [
    {
      "keybinds": "Cmd+Shift+T",
      "action": "terminal:create"
    },
    {
      "keybinds": "Cmd+Shift+W",
      "action": "terminal:close"
    },
    {
      "keybinds": "Cmd+Shift+O",
      "action": "terminal:zoomin"
    },
    {
      "keybinds": "Cmd+Shift+P",
      "action": "terminal:zoomout"
    },
    {
      "keybinds": "Cmd+Shift+L",
      "action": "terminal:left"
    },
    {
      "keybinds": "Cmd+Shift+M",
      "action": "terminal:right"
    }
  ],
  "localSSHHosts": [
    {
      "name": "Default host",
      "host": "hostname",
      "port": 22,
      "username": "root",
      "password": "removeIfNotNeeded",
      "privateKey": "removeIfNotNeeded"
    }
  ],
  "cloudUrl": ""
}</pre>
</details>

## Contributing
First, make sure you have Yarn installed on your system.

You will need `windows-build-tools` to compile the project. Install it globally (as an administrator) with:
- YARN: `yarn global add windows-build-tools`

Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
- `yarn`
3) Launch the development server and the app:
- `yarn dev`

See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## Licence
Squid is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
