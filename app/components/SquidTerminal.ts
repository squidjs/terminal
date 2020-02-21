import { Terminal } from 'xterm';
import Settings from '../settings/Settings';
import * as pty from 'node-pty';
import * as os from 'os';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { ITerminal } from 'node-pty/lib/interfaces';

const settings = new Settings();
let xterm: Terminal;
let ptyProcess: ITerminal;

export default class SquidTerminal {

    private fitAddon = new FitAddon();
    private webLinksAddon = new WebLinksAddon();
    private ligaturesAddon = new LigaturesAddon();

    constructor() {

        xterm = this.buildTerminal();
        ptyProcess = this.buildPtyProcess();

        this.applyTheme();

        // Open the terminal
        xterm.open(document.getElementById('xterm'));

        this.applyAddons();
        this.fit();

        xterm.onResize(this.onResize);
        xterm.onData(this.onData);
        ptyProcess.on('data', this.onPtyData);

        window.onresize = () => this.fit();
    }

    /**
     * Build the terminal object
     * @return The terminal
     */
    buildTerminal(): Terminal {

        return new Terminal({

            cursorBlink: settings.get('cursor.blink'),
            cursorStyle: settings.get('cursor.style'),
            // @ts-ignore
            experimentalCharAtlas: settings.get('experimentalCharAtlas'),
            fontSize: settings.get('font.size'),
            fontFamily: settings.get('font.family')
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

        xterm.loadAddon(this.fitAddon);
        xterm.loadAddon(this.webLinksAddon);
        //xterm.loadAddon(this.ligaturesAddon);
    }

    /**
     * Fit the terminal
     */
    fit() {

        this.fitAddon.fit();
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
