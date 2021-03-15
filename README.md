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

**Squid** is an extendible Shell and SSH terminal, with **end-to-end encryption** for SSH Hosts in the [cloud](#cloud).

We use [Electron](https://electronjs.org) and [ReactJS](https://reactjs.org). Everything is written in [TypeScript](https://typescriptlang.org).

<p align="center">
    <img src="https://i.imgur.com/PwCDVYx.png" />
</p>

## Table of content
- [Downloading](#downloading)
- [Configuration](#configuration)
- [Extending Squid](#extending)
- [Save SSH Hosts to the cloud](#cloud)
- [Contributing](#contributing)
- [Licence](#licence)

## Downloading
Squid is available on macOS (Intel and M1), Windows and Linux. Non-stable versions called **Canary** versions of Squid are availables for download in [releases](https://github.com/QuiiBz/squid/releases).

Please report any issues or new features you wish to see for Squid.

## Configuration
You can customize the appearence and features of Squid easily with its configuration. The configuration file is located at `userData/squid.json`.

Depending on your OS, `userData` correspond to:
* `%APPDATA%/squid` on Windows
* `~/.config/squid` on Linux
* `~/Library/Application Support/squid` on macOS

See the [documentation](docs/configuration/CONFIGURATION.md) for more information.

## Extending
Squid is higly customizable thanks to a powerful **plugins** system. With plugins, you can easily share and add custom **themes**, and add **new features**.

See the [documentation](docs/extending/EXTENDING.md) for more information.

## Cloud
You can save SSH Hosts in a remote server, to make them available on all the computers you use. They are then linked to your account on this server. The server is called [Squid Cloud](https://github.com/squidjs/cloud).

You can choose to use our server (this is the default configuration), or you can **self-host** it. See bellow for more information.

See the [documentation](docs/cloud/CLOUD.md) for more information.

## Contributing
Contributions are welcome.
See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## Licence
Squid is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
