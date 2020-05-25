import { Terminal } from 'xterm';
import * as pty from 'node-pty';
import { IPty } from 'node-pty';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import Options, { IOptions, ITheme } from '@/options/options';
import AppWatcher from '@/app/appWatcher';
import { remote, clipboard } from 'electron';

export default class AppTerminal {

    // The xterm instance
    protected xterm: Terminal;

    // The ptyProcess instance
    private ptyProcess: IPty;

    // The fitAddon instance - needed to call fit()
    private fitAddon: FitAddon | undefined;

    constructor(id: number) {

        const options: IOptions = Options.get().getOptions();

        // Build the instances
        this.xterm = this.buildTerminal(options);
        this.ptyProcess = this.buildPty(options.bash);

        // Apply themes and addons
        this.applyTheme(options.theme);
        this.summonTerminal(id);
        this.applyAddons();

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
     * Build the terminal instance with the settings
     *
     * @param IOptions
     * @return Terminal
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
     * cols and rows from xterm
     *
     * @param bash
     * @return IPty
     */
    private buildPty(bash: string): IPty {

        return pty.spawn(bash, [], {

            name: 'xterm-256color',
            cols: this.xterm.cols,
            rows: this.xterm.rows,
        });
    }

    /**
     * Summon the terminal to the element
     * in the DOM with the ID #terminal
     *
     * @param number
     * @return void
     */
    private summonTerminal(id: number): void {

        this.xterm.open(<HTMLElement>document.getElementById(`terminal-${id}`));
    }

    /**
     * Apply the current theme colors
     * to the xterm instance
     *
     * @return void
     */
    public applyTheme(theme: ITheme): void {

        this.xterm.setOption('theme', theme);
    }

    /**
     * Apply the addons to the xterm instance
     *
     * @return void
     */
    private applyAddons(): void {

        this.xterm.loadAddon(this.fitAddon = new FitAddon());
        this.xterm.loadAddon(new WebLinksAddon());
        this.xterm.loadAddon(new LigaturesAddon());
        this.xterm.loadAddon(new Unicode11Addon());

        this.xterm.unicode.activeVersion = '11';
    }

    /**
     * Set a option to the xterm instance
     *
     * @param string
     * @param any
     * @return void
     */
    public setOption(option: string, value: any): void {

        this.xterm.setOption(option, value);
    }

    /**
     * Fit xterm thanks to fitAddon
     *
     * @return void
     */
    public fit(): void {

        // @ts-ignore
        this.fitAddon.fit();
    }

    /**
     * Focus the xterm instance
     *
     * @return void
     */
    public focus(): void {

        this.xterm.focus();
    }

    /**
     * Resize the pty process to the specified
     * cols and rows
     *
     * @param data
     * @return void
     */
    private onResize(data: {cols: number, rows: number}): void {

        this.ptyProcess.resize(
            Math.max(data ? data.cols : this.xterm.cols, 1),
            Math.max(data ? data.rows : this.xterm.rows, 1));
    }

    /**
     * Write the data in the pty instance
     *
     * @param data
     * @return void
     */
    public onData(data: string): void {

        this.ptyProcess.write(data);
    }

    /**
     * Write the data in the xterm instance
     *
     * @param data
     * @return void
     */
    private onPtyData(data: string): void {

        this.xterm.write(data);
    }

    /**
     * Called when we exit the process
     *
     * @return void
     */
    public exit(): void {

        remote.getCurrentWindow().webContents.send('shortcuts', 'pane:close');
    }

    /**
     * Called when the terminal instance
     * is destroyed
     *
     * @return void
     */
    public onDestroy(): void {

        this.xterm.dispose();
        this.ptyProcess.kill();
    }
}

export interface ITerminal {

    index: number;
}
