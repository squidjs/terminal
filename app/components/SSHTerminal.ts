import { Client, ClientChannel } from 'ssh2';
import Settings, {ITheme} from '../settings/Settings';
import { remote } from 'electron';
import { IHost } from '../hosts/HostHandler';
import Pane from './Pane';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import {IPty} from "node-pty";
import * as pty from "node-pty";
import {loadTheme} from "../settings/handler";
import {WebLinksAddon} from "xterm-addon-web-links";
import {LigaturesAddon} from "xterm-addon-ligatures";

export default class SSHTerminal extends Pane {

    protected xterm: Terminal;
    private fitAddon: FitAddon;
    private connection: Client;
    private host: IHost;

    constructor(settings: Settings, id: number, host: IHost) {

        super(settings, id);

        this.host = host;
        this.connection = new Client();
    }

    /**
     * Called when the pane should open his content
     */
    open() {

        this.xterm = this.buildTerminal();

        this.applyTheme();

        // Open the terminal
        this.xterm.open(document.getElementById(this.getPrefixId()));

        this.applyAddons();

        this.xterm.onResize((data: {cols: number, rows: number}) => this.fit());

        window.onresize = () => this.fit();

        this.adapt();
        this.setupConnection();
    }

    /**
     * Build the terminal object
     * @return The terminal
     */
    buildTerminal(): Terminal {

        return new Terminal({

            cursorBlink: this.settings.get('cursor').blink,
            cursorStyle: this.settings.get('cursor').style,
            fontSize: this.settings.get('font').size,
            fontFamily: this.settings.get('font').family,
            fastScrollModifier: this.settings.get('fastScrollModifier')
        });
    }

    /**
     * Apply the theme
     */
    applyTheme() {

        const currentTheme = this.settings.get('currentTheme');
        let theme = this.settings.get('theme');

        if(currentTheme != theme.name)
            theme = loadTheme(currentTheme);

        this.xterm.setOption('theme', theme);
    }

    /**
     * Apply the addons needed
     */
    applyAddons() {

        this.xterm.loadAddon(this.fitAddon = new FitAddon());
        this.xterm.loadAddon(new WebLinksAddon());
        this.xterm.loadAddon(new LigaturesAddon());
    }

    /**
     * Called when the pane is created or focused
     */
    adapt() {

        if(this.isOpened()) {

            this.xterm.focus();
            this.fit();
        }
    }

    /**
     * Fit the terminal
     */
    fit() {

        if(this.isOpened())
            this.fitAddon.fit();
    }

    /**
     * Setup the SSH connection
     */
    setupConnection() {

        this.connection.on('ready', () => {

            this.connection.shell((error: Error | undefined, stream: ClientChannel) => {

                if(error)
                    throw error;

                stream.on('close', () => {

                    this.connection.end();
                    remote.getCurrentWindow().webContents.send('shortcuts', 'pane:close');

                }).on('data', (data) => {

                    this.xterm.write(data.toString());

                }).stderr.on('data', (data) => {

                    this.xterm.write(data.toString());
                });

                this.xterm.onKey((data: {key: string, domEvent: KeyboardEvent }) => {

                    stream.write(data.key);
                });
            });
        }).connect({
            host: this.host.ip,
            port: this.host.port,
            username: this.host.username,
            password: this.host.password,
        });
    }

    /**
     * Called when data is received from the terminal
     * @param data
     */
    onData(data: string) {

        this.xterm.write(data);
    }
}
