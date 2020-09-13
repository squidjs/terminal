import { Terminal } from 'xterm';
import * as pty from 'node-pty';
import { IPty } from 'node-pty';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { WebglAddon } from 'xterm-addon-webgl';
import Options, { IOptions, ITheme } from '@/options/options';
import AppWatcher from '@/app/appWatcher';
import { remote, clipboard, shell } from 'electron';

export default class AppTerminal {

    // The xterm instance
    protected xterm: Terminal;

    // The ptyProcess instance
    private ptyProcess: IPty;

    // The fitAddon instance - needed to call fit()
    private fitAddon: FitAddon | undefined;

    // The id of this terminal;
    private id: number;

    constructor(id: number) {

        const options: IOptions = Options.get().getOptions();

        // Build the instances
        this.xterm = this.buildTerminal(options);
        this.ptyProcess = this.buildPty(options.shell);
        this.id = id;

        // Apply themes and addons
        this.applyTheme(options.theme);
        this.summonTerminal(this.id);
        this.applyAddons(options);

        // Listeners
        this.xterm.onResize((data: {cols: number, rows: number}) => this.onResize(data));
        this.xterm.onData((data: string) => this.onData(data));
        this.xterm.onSelectionChange(() => clipboard.writeText(this.xterm.getSelection(), 'selection'));
        this.ptyProcess.onData((data: string) => this.onPtyData(data));
        this.ptyProcess.onExit(() => this.exit());

        window.onresize = () => this.fit();

        // Focus and fit the window
        this.fit();
        this.focus();

        new AppWatcher(this);
    }

    /**
     * Build the terminal instance with the settings.
     *
     * @param options - The options to set
     * @returns The Terminal instance
     */
    private buildTerminal(options: IOptions): Terminal {

        return new Terminal({

            cursorBlink: options.cursor.blink,
            cursorStyle: options.cursor.style,
            fontSize: options.font.size,
            fontFamily: options.font.family,
            fastScrollModifier: options.fastScrollModifier,
        });
    }

    /**
     * Build the pty instance with the good
     * cols and rows from xterm.
     *
     * @param shell - The path to the desired shell
     * @returns The IPty instance
     */
    private buildPty(shell: string): IPty {

        const cwd: string = require('os').homedir();

        return pty.spawn(shell, [], {

            name: 'xterm-256color',
            cols: this.xterm.cols,
            rows: this.xterm.rows,
            cwd
        });
    }

    /**
     * Summon the terminal to the element
     * in the DOM with the ID #terminal.
     *
     * @param id - The id of the terminal to summon
     */
    private summonTerminal(id: number) {

        this.xterm.open(document.getElementById(`terminal-${id}`) as HTMLElement);
    }

    /**
     * Apply the current theme colors
     * to the xterm instance.
     */
    public applyTheme(theme: ITheme) {

        this.xterm.setOption('theme', theme);
    }

    /**
     * Apply the addons to the xterm instance.
     */
    private applyAddons(options: IOptions) {

        this.xterm.loadAddon(this.fitAddon = new FitAddon());
        this.xterm.loadAddon(new WebLinksAddon((event: MouseEvent, uri: string) => shell.openExternal(uri)));
        this.xterm.loadAddon(new LigaturesAddon());
        this.xterm.loadAddon(new Unicode11Addon());

        if(options.webGlRendering)
            this.xterm.loadAddon(new WebglAddon());

        this.xterm.unicode.activeVersion = '11';
    }

    /**
     * Set a option to the xterm instance.
     *
     * @param option - The option key
     * @param value - The option value
     */
    public setOption(option: string, value: any) {

        this.xterm.setOption(option, value);
    }

    /**
     * Fit xterm thanks to fitAddon.
     */
    public fit() {

        // @ts-ignore
        this.fitAddon.fit();
    }

    /**
     * Focus the xterm instance.
     */
    public focus() {

        this.xterm.focus();
    }

    /**
     * Resize the pty process to the specified
     * cols and rows.
     *
     * @param size - The size object to resize
     */
    private onResize(size: {cols: number, rows: number}) {

        this.ptyProcess.resize(
            Math.max(size ? size.cols : this.xterm.cols, 1),
            Math.max(size ? size.rows : this.xterm.rows, 1));
    }

    /**
     * Write the data in the pty instance.
     *
     * @param data - The data to write to the pty instance
     */
    public onData(data: string) {

        this.ptyProcess.write(data);
    }

    /**
     * Write the data in the xterm instance.
     *
     * @param data - The data to write to xterm
     */
    private onPtyData(data: string) {

        this.xterm.write(data);
    }

    /**
     * Called when we exit the process.
     */
    public exit() {

        remote.getCurrentWindow().webContents.send('shortcuts', 'pane:close', this.id);
    }

    /**
     * Called when the terminal instance
     * is destroyed.
     */
    public onDestroy() {

        this.xterm.dispose();
        this.ptyProcess.kill();
    }

    /**
     * Get the id of the terminal.
     *
     * @returns number
     */
    public getId(): number {

        return this.id;
    }
}

export interface ITerminal {

    index: number;
}
