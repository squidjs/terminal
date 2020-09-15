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
    <a href="https://www.code-inspector.com/project/4175/score/svg">
        <img src="https://www.code-inspector.com/project/4175/score/svg" />
    </a>
    <a href="https://github.com/QuiiBz/squid/issues">
        <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
    </a>
</p>

**Squid** is a terminal emulator, build with new technologies (HTML, CSS, JS).
We use [Electron](https://electronjs.org) and [VueJS](https://vuejs.org). Everything is written in [TypeScript](https://typescriptlang.org).

## Table of content
- [Downloading](#downloading)
- [App settings](#app-settings)
- [Screenshot](#screenshot)
- [Contributing](#contributing)
- [License](#license)

## Downloading
**Canary** versions of Squid are availables for download in [releases](https://github.com/QuiiBz/squid/releases).

Please report any issues or new features you wish to see for Squid.

## App settings
The settings file is located in the `userData` folder.

Depending on your OS, `userData` correspond to:
* `%APPDATA%` on Windows
* `$XDG_CONFIG_HOME` or `~/.config` on Linux
* `~/Library/Application Support` on macOS

Below is an example settings file, located in `userData/settings.squid.json`:
<details>
    <summary>Example settings file</summary>
    <pre>{
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
  "bell": {
    "style": "none"
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
  "fastScrollSensitivity": 5,
  "scrollSensitivity": 1,
  "webGlRendering": true,
  "vibrancyEnabled": true,
  "vibrancy": {
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
    },
    {
      "keys": "CommandOrControl+Up",
      "action": "pane:zoomIn"
    },
    {
      "keys": "CommandOrControl+Down",
      "action": "pane:zoomOut"
    }
  ]
}</pre>
</details>

Most of theses settings will apply immediately when saving the file, without need to restart the app.

Here are all the settings explained:

| Key | Description | Possible values | Auto refresh |
| --- | --- | --- | --- |
| theme | The default theme | A theme object | ✔ |
| bell.sound | The sound for the bell | A data uri | ✔ |
| bell.style | The style of the bell | 'none' / 'sound' | ✔ |
| cursor.style | The style of the cursor | 'block' / 'underline' / 'bar' | ✔ |
| cursor.blink | If the cursor should blink | A boolean value (true / false) | ✔ |
| font.size | The size of the font | A number | ✔ |
| font.family | The font family you wish to use | An array of string (\"Fira Code\", monospace) | ✔ |
| opacity | The opacity of the app | A float (0 to 1) | ✔ |
| shell | The path to your shell | '/bin/bash' / 'C:\\Windows\\System32\\wsl.exe' / ... | ❌ |
| currentTheme | The name of the theme you want to use | A string of the theme name | ❌ |
| fastScrollModifier | The key you want to use to scroll faster when pressed | 'shift' / 'alt' / ... | ✔ |
| fastScrollSensitivity | The sensitivity for the fast scroll | A number above 0 | ✔ |
| scrollSensitivity | The sensitivity for the scroll | A number above 0 | ✔ |
| webGlRendering | If you want to use WebGl rendering (usually faster) | A boolean value (true / false) | ❌ |
| vibrancyEnabled | If you want to enable vibrancy | A boolean value (true / false) | ✔ |
| vibrancy.theme | The theme of the vibrancy | 'light' / 'dark' / 'appearance-based' / A hex color | ✔ |
| vibrancy.effect | The type of effect to use | 'acrylic' / 'blur' | ✔ |
| vibrancy.useCusWinRefMethod | If you want to enable a fast refresh method | A boolean value (true / false) | ❌ |
| vibrancy.maximumRefreshRate | The maximum value to refresh application screen in seconds | A number in seconds | ✔ |
| vibrancy.disableOnBlur | If the vibrancy should disable on blur | A boolean value (true / false) | ✔ |
| shortcuts | All the shortcuts you want to use | An array of shortcuts with the keys and an action | ❌ |
| shortcuts.keys | The keys to trigger this shortcut | See <a href="https://www.electronjs.org/docs/api/accelerator">Accelerator doc</a> | |
| shortcuts.action | The action for this shortcut | 'pane:open' / 'pane:close' / 'pane:switchLeft' / 'pane:switchRight' / Plugins actions | |

## Screenshot
<p align="center">
    <img src="https://i.imgur.com/1pSJyPI.png" />
</p>

## Contributing
Yarn is highly recommanded, but you can still use NPM.

First of all, make sure you have NPM or Yarn installed on your system. Then:
1) Fork this repository, then clone it to your device
2) Install JS dependencies with:
   - NPM: `npm install`
   - Yarn: `yarn`
3) Launch the development server and the app:
   - NPM: `npm run electron:serve`
   - Yarn: `yarn electron:serve`
   
See [contributing](CONTRIBUTING.md) for more informations   
   
## License
Squid is licenced under [MIT](https://choosealicense.com/licenses/mit/) license.