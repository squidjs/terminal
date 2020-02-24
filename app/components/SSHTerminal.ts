import SquidTerminal from './SquidTerminal';
import { Client, ClientChannel } from 'ssh2';
import Settings from '../settings/Settings';

export default class SSHTerminal extends SquidTerminal {

    private connection: Client;
    private stream: ClientChannel;
    private cmd: string;

    constructor(settings: Settings, id: number) {

        super(settings, id);

        this.connection = new Client();
        this.cmd = '';
    }

    open(bash: string) {

        this.xterm = this.buildTerminal();

        this.applyTheme();

        // Open the terminal
        this.xterm.open(document.getElementById(this.getPrefixId()));

        this.applyAddons();

        this.xterm.onResize((data: {cols: number, rows: number}) => this.fit());
        this.xterm.onData((data: string) => this.onData(data));
        this.xterm.onKey((data: { key: string, domEvent: KeyboardEvent }) => {

            if(data.domEvent.keyCode === 13) {

                this.stream.write(this.cmd + '\n');
                this.cmd = '';

            } else
                this.cmd += data.key;
        });

        window.onresize = () => this.fit();

        this.opened = true;

        this.adapt();
        this.setupConnection();
    }

    setupConnection() {

        this.connection.on('ready', () => {

            this.connection.shell((error: Error | undefined, stream: ClientChannel) => {

                if(error)
                    throw error;

                this.stream = stream.on('close', () => {

                    this.connection.end();

                }).on('data', (data) => {

                    this.xterm.write(data);
                });
            });

        }).connect({
            host: '51.83.40.52',
            port: 3400,
            username: 'root',
            password: 'GLjy7aow'
        });
    }

    onData(data: string) {

        this.xterm.write(data);
    }
}
