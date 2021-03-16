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
- [Documentation](#documentation)
- [Extending the app](#extending)
- [Save SSH Hosts to the cloud](#cloud)
- [Contributing](#contributing)
- [Licence](#licence)

## Downloading
**Canary** versions of Squid will be soon available for download in [releases](https://github.com/QuiiBz/squid/releases).

Please report any issues or new features you wish to see for Squid.

## Documentation
Documentation is available at [https://squidjs.github.io/docs](https://squidjs.github.io/docs);

## Extending
The config file is located in your user's home directory, and called `.squidrc.json`. Squid is higly customizable thanks to a powerful **plugins** system. With plugins, you can easily share and add custom **themes**, and add **new features**.

See the [documentation](https://squidjs.github.io/docs/configuration) for more information.

## Cloud
You can save SSH Hosts in a remote server, to make them available on all the computers you use. They are then linked to your account on this server. The server is called [Squid Cloud](https://github.com/squidjs/cloud).

You can choose to use our server (this is the default configuration), or you can **self-host** it.

See the [documentation](https://squidjs.github.io/docs/cloud) for more information.

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
