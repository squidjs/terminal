import { Terminal } from 'xterm';
import Settings from '../settings/Settings';
import * as pty from 'node-pty';
import * as os from "os";
import { ITerminal } from 'node-pty/lib/interfaces';

const fit = require('xterm/lib/addons/fit/fit');
const webLinks = require('xterm/lib/addons/webLinks/webLinks');
const settings = new Settings();
let xterm;
let ptyProcess;

export default class SquidTerminal {

    constructor() {

        xterm = this.buildTerminal();
        ptyProcess = this.buildPtyProcess();

        this.applyTheme();
        this.applyAddons();

        // Open the terminal
        xterm.open(document.getElementById('xterm'));

        (xterm as any).webLinksInit();
        this.fit();

        xterm.on('resize', this.onResize);
        xterm.on('data', this.onData);
        ptyProcess.on('data', this.onPtyData);

        window.onresize = () => this.fit();
    }

    /**
     * Build the terminal object
     * @return The terminal
     */
    buildTerminal(): Terminal {

        return new Terminal({

            cursorBlink: <boolean>settings.get('cursor.blink'),
            // @ts-ignore
            cursorStyle: settings.get('cursor.style'),
            // @ts-ignore
            experimentalCharAtlas: settings.get('experimentalCharAtlas'),
            fontSize: <number>settings.get('font.size'),
            fontFamily: <string>settings.get('font.family')
        });
    }

    /**
     * Build the pty process thanks to node-pty
     * @return The pty process
     */
    buildPtyProcess(): ITerminal {

        return pty.spawn(os.platform() === 'win32' ? <string>settings.get('bash') : process.env.SHELL || '/bin/bash', [], {

            name: 'xterm-256color',
            cols: xterm.cols,
            rows: xterm.rows,
        });
    }

    /**
     * Apply the theme
     */
    applyTheme() {

        xterm.setOption('theme', settings.get('theme'));
    }

    /**
     * Apply the addons needed
     */
    applyAddons() {

        Terminal.applyAddon(fit);
        Terminal.applyAddon(webLinks);
    }

    /**
     * Fit the terminal
     */
    fit() {

        (xterm as any).fit();
    }

    /**
     * Called when we resize the terminal
     * @param data
     */
    onResize(data: {cols: number, rows: number}) {

        ptyProcess.resize(
            Math.max(data ? data.cols : xterm.cols, 1),
            Math.max(data ? data.rows : xterm.rows, 1));
    }

    /**
     * Called when data is received from the terminal
     * @param data
     */
    onData(data: string) {

        ptyProcess.write(data);
    }

    /**
     * Called when data is received from pty
     * @param data
     */
    onPtyData(data: string) {

        xterm.write(data);
    }
}

// Create the object when this file is required
new SquidTerminal();
