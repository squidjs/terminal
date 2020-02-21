import { Terminal } from 'xterm';
import Settings from '../settings/Settings';
import * as pty from 'node-pty';
import * as os from 'os';
import { ITerminal } from 'node-pty/lib/interfaces';

const fit = require('xterm/lib/addons/fit/fit');
const webLinks = require('xterm/lib/addons/webLinks/webLinks');
const settings = new Settings();

export default class SquidTerminal {

    private xterm: Terminal;
    private ptyProcess: ITerminal;
    private termId: string;

    constructor(termId: string) {

        this.termId = termId;

        this.xterm = this.buildTerminal();
        this.ptyProcess = this.buildPtyProcess();

        this.applyTheme();

        // Open the terminal
        this.xterm.open(document.getElementById(termId));

        this.applyAddons();
        (this.xterm as any).webLinksInit();
        this.fit();

        this.xterm.onResize((data: {cols: number, rows: number}) => this.onResize(data));
        this.xterm.onData((data: string) => this.onData(data));
        this.ptyProcess.on('data', (data: string) => this.onPtyData(data));

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
            fontFamily: settings.get('font.family'),
            rendererType: 'dom',
        });
    }

    /**
     * Build the pty process thanks to node-pty
     * @return The pty process
     */
    buildPtyProcess(): ITerminal {

        return pty.spawn(os.platform() === 'win32' ? <string>settings.get('bash') : process.env.SHELL || '/bin/bash', [], {

            name: 'xterm-256color',
            cols: this.xterm.cols,
            rows: this.xterm.rows,
        });
    }

    /**
     * Apply the theme
     */
    applyTheme() {

        this.xterm.setOption('theme', settings.get('theme'));
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

        (this.xterm as any).fit();
    }

    /**
     * Focus the terminal
     */
    focus() {

        this.xterm.focus();
    }

    /**
     * Called when we resize the terminal
     * @param data
     */
    onResize(data: {cols: number, rows: number}) {

        this.ptyProcess.resize(
            Math.max(data ? data.cols : this.xterm.cols, 1),
            Math.max(data ? data.rows : this.xterm.rows, 1));
    }

    /**
     * Called when data is received from the terminal
     * @param data
     */
    onData(data: string) {

        this.ptyProcess.write(data);
    }

    /**
     * Called when data is received from pty
     * @param data
     */
    onPtyData(data: string) {

        this.xterm.write(data);
    }

    /**
     * Return the terminal id
     * @return string
     */
    getTermId(): string {

        return this.termId;
    }
}
