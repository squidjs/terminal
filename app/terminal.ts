const os = require('os');
const pty = require('node-pty');
const Terminal = require('xterm').Terminal;
const fit = require('xterm/lib/addons/fit/fit');
const webLinks = require('xterm/lib/addons/webLinks/webLinks');
const settings = require('electron-settings');
const path = require('path');

Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);

const xterm = new Terminal(settings.get('options'));

xterm.setOption('theme', settings.get('theme'));

xterm.open(document.getElementById('xterm'));
xterm.webLinksInit();
xterm.fit();

const ptyProcess = pty.spawn(os.platform() === 'win32' ? settings.get('options.bash') : process.env.SHELL || '/bin/bash', [], {

    name: 'xterm-256color',
    cols: xterm.cols,
    rows: xterm.rows,
});

xterm.on('resize', size => ptyProcess.resize(Math.max(size ? size.cols : xterm.cols, 1), Math.max(size ? size.rows : xterm.rows, 1)));
xterm.on('data', (data) => ptyProcess.write(data));

ptyProcess.on('data', data => xterm.write(data));

window.onresize = () => xterm.fit();

settings.watch('options.fontSize', (newValue, oldValue) => {

    xterm.setOption('fontSize', newValue);
    xterm.fit();
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

    let div = document.querySelector('.xterm-background');
    let imagePath = path.relative(path.resolve(__dirname), path.resolve(image));
    imagePath = imagePath.replace(/\\/g, '/');

    div.style.backgroundImage = 'url("' + imagePath + '")';
    div.style.opacity = opacity;
}
