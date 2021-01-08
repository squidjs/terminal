<p align="center">
    <img src="https://i.imgur.com/L5TUf4J.png" width="100" />
</p>

<p align="center">
    <a href="https://github.com/QuiiBz/squid/actions">
        <img src="https://github.com/QuiiBz/squid/workflows/Lint/badge.svg" />
    </a>
    <a href="https://travis-ci.com/QuiiBz/squid">
        <img src="https://travis-ci.com/QuiiBz/squid.svg?branch=canary" />
    </a>
    <a href="https://github.com/QuiiBz/squid/issues">
        <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
    </a>
</p>

**Squid** is a Shell and SSH terminal, build with web technologies (HTML, CSS, JS).
We use [Electron](https://electronjs.org) and [ReactJS](https://reactjs.org). Everything is written in [TypeScript](https://typescriptlang.org).

## Table of content
- [Downloading](#downloading)
- [App settings](#app-settings)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Downloading
**Canary** versions of Squid will be soon available for download in [releases](https://github.com/QuiiBz/squid/releases).

Please report any issues or new features you wish to see for Squid.

## App settings
The settings file is located in the `userData` folder.

Depending on your OS, `userData` correspond to:
* `%APPDATA%` on Windows
* `$XDG_CONFIG_HOME` or `~/.config` on Linux
* `~/Library/Application Support` on macOS

Below is the default settings file, located in `userData/squid.json`.
Most of these settings will apply immediately when saving the file, without the need to restart the app.

<details>
    <summary>Example settings file</summary>
    <pre>{
  "theme": {
    "background": "#0F0F0F",
    "border": "#575656",
    "text": "#575656",
    "textHover": "#ffffff",
    "foreground": "#22da6e",
    "cursor": "#22da6e",
    "cursorAccent": "#22da6e",
    "selection": "#22da6e",
    "black": "#011627",
    "red": "#EF5350",
    "green": "#22da6e",
    "yellow": "#addb67",
    "blue": "#82aaff",
    "magenta": "#c792ea",
    "cyan": "#21c7a8",
    "white": "#ffffff",
    "brightBlack": "#575656",
    "brightRed": "#ef5350",
    "brightGreen": "#22da6e",
    "brightYellow": "#ffeb95",
    "brightBlue": "#82aaff",
    "brightMagenta": "#c792ea",
    "brightCyan": "#7fdbca",
    "brightWhite": "#ffffff"
  },
  "defaultShell": {
    "name": "Default",
    "path": "cmd.exe"
  },
  "shells": [
    {
      "name": "CMD",
      "path": "cmd.exe"
    },
    {
      "name": "PowerShell",
      "path": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    },
    {
      "name": "Git Bash",
      "path": "C:\\Program Files\\Git\\bin\\bash.exe"
    },
    {
      "name": "WSL",
      "path": "C:\\Windows\\System32\\wsl.exe"
    }
  ],
  "webGlRendering": true,
  "copyOnSelected": true,
  "restoreWindowPosition": true,
  "tabsIcons": true,
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
  "vibrancy": {
    "enabled": true,
    "theme": "appearance-based",
    "effect": "acrylic",
    "useCustomWindowRefreshMethod": false,
    "maximumRefreshRate": 60,
    "disableOnBlur": false
  },
  "shortcuts": [
    {
      "name": "Create terminal",
      "keybinds": "Ctrl+Shift+T",
      "action": "terminal:create"
    },
    {
      "name": "Close terminal",
      "keybinds": "Ctrl+Shift+W",
      "action": "terminal:close"
    },
    {
      "name": "Zoom in",
      "keybinds": "Ctrl+Shift+O",
      "action": "terminal:zoomin"
    },
    {
      "name": "Zoom out",
      "keybinds": "Ctrl+Shift+P",
      "action": "terminal:zoomout"
    },
    {
      "name": "Focus left terminal",
      "keybinds": "Ctrl+Shift+L",
      "action": "terminal:left"
    },
    {
      "name": "Focus right terminal",
      "keybinds": "Ctrl+Shift+M",
      "action": "terminal:right"
    },
    {
      "name": "Open DevTools",
      "keybinds": "Ctrl+Shift+I",
      "action": "window:devtools"
    },
    {
      "name": "Reload window",
      "keybinds": "Ctrl+Shift+R",
      "action": "window:reload"
    }
  ],
  "sshHosts": [
    {
      "name": "Default host",
      "host": "hostname",
      "port": 22,
      "username": "root",
      "password": "removeIfNotNeeded",
      "privateKey": "removeIfNotNeeded"
    }
  ]
}</pre>
</details>

## Screenshots
<p align="center">
    <img src="https://i.imgur.com/io5VEdv.png" />
</p>

## Contributing
Yarn is highly recommended, but you can still use NPM.

First, make sure you have NPM or Yarn installed on your system.

You will need `windows-build-tools` to compile the project. Install it globally (as an administrator) with:
- YARN: `yarn global add windows-build-tools`
- NPM: `npm i -g windows-build-tools`

Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
    - Yarn: `yarn`
    - NPM: `npm install`
3) Launch the development server and the app:
    - Yarn: `yarn dev`
    - NPM: `npm run dev`

See [contributing](CONTRIBUTING.md) for more information.

## License
Squid is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
