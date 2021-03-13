import XTerminalFactory from '@app/factories/XTerminalFactory';
import PtyProcessFactory from '@app/factories/process/PtyProcessFactory';
import { IConfig, IShell, ISSHHost } from '@common/config/Config';
import ProcessFactory from '@app/factories/ProcessFactory';
import { IPty } from 'node-pty';
import { Client } from 'ssh2';
import SSHProcessFactory from '@app/factories/process/SSHProcessFactory';
import { Terminal as XTerminal } from 'xterm';
import { clipboard } from 'electron';
import { isTerminalSSH } from '@common/utils/utils';

export type ProcessType = IPty | Client;
export type TerminalType = ISSHHost | IShell;

export default class Terminal {

    private config: IConfig;

    private xTerminal: XTerminalFactory;
    private readonly process: ProcessFactory<ProcessType>;

    constructor(config: IConfig, id: number, terminalType: TerminalType, onClose: () => void, onTitle: (title: string) => void) {

        this.config = config;
        this.xTerminal = new XTerminalFactory(config);

        const isSSH = isTerminalSSH(terminalType);
        this.process = isSSH ? new SSHProcessFactory() : new PtyProcessFactory();

        const terminal = this.xTerminal.build({

            config: this.config,
        });

        this.buildProcess(isSSH, terminalType, terminal);

        this.xTerminal.spawn(id, this.process, (title: string) => {

            onTitle(title);
        });

        this.process.listen(terminal, terminalType, () => {

            this.xTerminal.getFactoryObject().dispose();
            onClose();
        });
    }

    /**
     * Build the process corresponding to the type of
     * terminal we want.
     *
     * @param isSSH - If we want a ssh terminal
     * @param terminalType - The terminal type object
     * @param terminal - The xterm instance
     */
    private buildProcess(isSSH: boolean, terminalType: TerminalType, terminal: XTerminal) {

        if(!isSSH) {

            const shell = terminalType as IShell;

            // Force cast to get type definitions
            (this.process as PtyProcessFactory).build({

                terminal,
                shell: shell.path,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                cwd: require('os').homedir(),
                terminalType,
            });

        } else {

            const ssh = terminalType as ISSHHost;

            // Force cast to get type definitions
            (this.process as SSHProcessFactory).build({

                ...ssh,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                privateKey: ssh.privateKey ? require('fs').readFileSync(ssh.privateKey) : undefined,
            });
        }
    }

    /**
     * Focus the xterm instance.
     */
    public focus() {

        this.xTerminal.getFactoryObject().focus();
        this.xTerminal.fit();
    }

    /**
     * Update the config for this terminal.
     *
     * @param config - The new config to use
     */
    public updateConfig(config: IConfig) {

        this.config = config;

        this.xTerminal.loadConfig(config);
        this.xTerminal.fit();
    }

    /**
     * Write string data to the process instance.
     *
     * @param data - The data to write
     */
    public write(data: string) {

        this.process.write(data);
    }

    /**
     * Zoom in or out in this terminal.
     *
     * @param zoomIn - If we should zoom in or out
     * @returns The new zoom value in px
     */
    public zoom(zoomIn: boolean): number {

        let currentZoom = this.xTerminal.getFactoryObject().getOption('fontSize');

        if(zoomIn)
            currentZoom++;
        else
            currentZoom--;

        this.xTerminal.getFactoryObject().setOption('fontSize', currentZoom);
        this.xTerminal.fit();

        return currentZoom;
    }

    /**
     * Copy the current selection to the clipboard.
     */
    public copySelected() {

        this.xTerminal.copySelected(true);
    }

    /**
     * Paste the content of the clipboard in the terminal.
     */
    public paste() {

        this.write(clipboard.readText());
    }

    /**
     * Build the env variables from the env specified in the
     * config of the current terminalType, and the process env.
     *
     * @param terminalType - The terminalType to grab the env values from
     * @returns The built env variables
     */
    public static buildEnv(terminalType: TerminalType): { [key: string]: string } {

        return Object.assign({ }, terminalType.env, process.env);
    }
}

export interface IWindow {

    id: number;
    name: string;
    terminalType: TerminalType;
    selected: boolean;
}
