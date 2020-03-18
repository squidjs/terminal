import { Client, ClientChannel, ClientErrorExtensions, ConnectConfig } from 'ssh2';
import Settings, {ISettings, ITheme} from '../settings/Settings';
import { remote } from 'electron';
import { IHost } from '../hosts/HostHandler';
import Pane from './Pane';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { loadTheme } from '../settings/handler';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import * as fs from 'fs';

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
     * Apply a new theme
     * @param theme
     */
    applyNewTheme(theme: ITheme) {

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
     * Apply the new settings
     * @param settings
     */
    applySettings(settings: ISettings) {

        this.applyNewTheme(loadTheme(settings.currentTheme));

        this.xterm.setOption('cursorBlink', settings.cursor.blink);
        this.xterm.setOption('cursorStyle', settings.cursor.style);
        this.xterm.setOption('fontSize', settings.font.size);
        this.xterm.setOption('fontFamily', settings.font.family);
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

        this.connection.on('error', (error: Error & ClientErrorExtensions) => this.xterm.write(error.message));

        const config: ConnectConfig = {
            host: this.host.ip,
            port: this.host.port,
            username: this.host.username,
            password: this.host.password
        };

        if(fs.existsSync(this.host.privateKey))
            config.privateKey = fs.readFileSync(this.host.privateKey);

        this.connection.on('ready', () => {

            this.connection.shell({rows: this.xterm.rows, cols: this.xterm.cols}, (error: Error | undefined, stream: ClientChannel) => {

                if(error)
                    throw error;

                this.xterm.onResize((data: {cols: number, rows: number}) => {

                    this.fit();
                    stream.setWindow(data.rows, data.cols, window.innerHeight, window.innerWidth);
                });

                stream.on('close', () => {

                    this.connection.end();
                    remote.getCurrentWindow().webContents.send('shortcuts', 'pane:close');

                }).on('data', (data) => {

                    this.xterm.write(data.toString());

                }).stderr.on('data', (data) => {

                    this.xterm.write(data.toString());
                });

                this.xterm.onKey((data: {key: string, domEvent: KeyboardEvent }) => stream.write(data.key));
            });
        }).connect(config);
    }

    /**
     * Called when data is received from the terminal
     * @param data
     */
    onData(data: string) {

        this.xterm.write(data);
    }
}
