import XTerminalFactory from './factories/XTerminalFactory';
import PtyProcessFactory from './factories/process/PtyProcessFactory';
import { IConfig, IShell, ISSHHost } from '../common/config/Config';
import ProcessFactory from './factories/ProcessFactory';
import { IPty } from 'node-pty';
import { Client } from 'ssh2';
import SSHProcessFactory from './factories/process/SSHProcessFactory';
import { Terminal as XTerminal } from 'xterm';

export type ProcessType = IPty | Client;
export type TerminalType = ISSHHost | IShell;

export default class Terminal {

	private config: IConfig;

	private xTerminal: XTerminalFactory;
	private readonly process: ProcessFactory<ProcessType>;

	constructor(config: IConfig, id: number, terminalType: TerminalType, onClose: () => void, onTitle: (title: string) => void) {

		this.config = config;
		this.xTerminal = new XTerminalFactory(config);

		// To define the type of terminal to open, we check if
		// there is a username property. If yes, we assume that
		// we want to open a ssh terminal.
		const isSSH = Object.prototype.hasOwnProperty.call(terminalType, 'username');
		this.process = !isSSH ? new PtyProcessFactory() : new SSHProcessFactory();

		const terminal = this.xTerminal.build({

			config: this.config,
		});

		console.log(isSSH, terminalType);

		this.buildProcess(isSSH, terminalType, terminal);

		this.xTerminal.spawn(id, this.process, (title: string) => {

			onTitle(title);
		});

		this.process.listen(terminal, () => {

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

			this.process.build({

				terminal,
				shell: shell.path,
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				cwd: require('os').homedir(),
			});

		} else {

			const ssh = terminalType as ISSHHost;

			this.process.build({

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
	 */
	public zoom(zoomIn: boolean) {

		let currentZoom = this.xTerminal.getFactoryObject().getOption('fontSize');

		if(zoomIn)
			currentZoom++;
		else
			currentZoom--;

		this.xTerminal.getFactoryObject().setOption('fontSize', currentZoom);
		this.xTerminal.fit();
	}
}

export interface ITerminal {

	id: number;
	name: string;
	terminalType: TerminalType;
}
