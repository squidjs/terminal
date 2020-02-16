import * as os from 'os';
import * as pty from 'node-pty';
import { Terminal } from 'xterm';
import path from 'path';

const settings = require('electron-settings');
const fit = require('xterm/lib/addons/fit/fit');
const webLinks = require('xterm/lib/addons/webLinks/webLinks');

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

const xterm = new Terminal(settings.get('options'));
xterm.setOption('theme', settings.get('theme'));

xterm.open(document.getElementById('xterm'));
(xterm as any).webLinksInit();
(xterm as any).fit();

const ptyProcess = pty.spawn(os.platform() === 'win32' ? settings.get('options.bash') : process.env.SHELL || '/bin/bash', [], {

    name: 'xterm-256color',
    cols: xterm.cols,
    rows: xterm.rows,
});

xterm.on('resize', size => ptyProcess.resize(Math.max(size ? size.cols : xterm.cols, 1), Math.max(size ? size.rows : xterm.rows, 1)));
xterm.on('data', (data) => ptyProcess.write(data));

ptyProcess.on('data', data => xterm.write(data));

window.onresize = () => (xterm as any).fit();

settings.watch('options.fontSize', (newValue, oldValue) => {

    xterm.setOption('fontSize', newValue);
    (xterm as any).fit();
});

settings.watch('options.cursorStyle', (newValue, oldValue) => xterm.setOption('cursorStyle', newValue));
settings.watch('options.cursorBlink', (newValue, oldValue) => xterm.setOption('cursorBlink', newValue));
settings.watch('options.backgroundImage', (newValue, oldValue) => updateImage(newValue));
settings.watch('options.backgroundImageOpacity', (newValue, oldValue) => updateImage(null, newValue));

settings.watch('theme.background', (newValue, oldValue) => {

    xterm.setOption('theme', {

        background: newValue,
        foreground: settings.get('theme.foreground'),
        cursor: settings.get('theme.cursor')
    });
});

settings.watch('theme.foreground', (newValue, oldValue) => {

    xterm.setOption('theme', {

        background: settings.get('theme.background'),
        foreground: newValue,
        cursor: settings.get('theme.cursor')
    });
});

settings.watch('theme.cursor', (newValue, oldValue) => {

    xterm.setOption('theme', {

        background: settings.get('theme.background'),
        foreground: settings.get('theme.foreground'),
        cursor: newValue
    });
});

let div = document.createElement('div');
div.className = 'xterm-background';

let node = document.querySelector('.xterm-screen');
node.parentNode.insertBefore(div, node);

updateImage();

function updateImage(image = null, opacity = null) {

    if (image == null)
        image = settings.get('options.backgroundImage');

    if (opacity == null)
        opacity = settings.get('options.backgroundImageOpacity');

    let div: HTMLElement = document.querySelector('.xterm-background');
    let imagePath = path.relative(path.resolve(__dirname), path.resolve(image));
    imagePath = imagePath.replace(/\\/g, '/');

    div.style.backgroundImage = 'url("' + imagePath + '")';
    div.style.opacity = opacity;
}
