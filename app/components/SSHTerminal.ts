import SquidTerminal from './SquidTerminal';
import { Client, ClientChannel } from 'ssh2';
import Settings from '../settings/Settings';
import { remote } from 'electron';
import { IHost } from '../hosts/HostHandler';

export default class SSHTerminal extends SquidTerminal {

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

        this.opened = true;

        this.adapt();
        this.setupConnection();
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
