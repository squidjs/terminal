import XTerminalFactory from './factories/XTerminalFactory';
import PtyFactory from './factories/PtyFactory';
import { IConfig, IShell } from '../common/config/Config';

export default class Terminal {

	private config: IConfig;

	private xTerminal: XTerminalFactory;
	private pty: PtyFactory;

	constructor(config: IConfig, id: number, shell: IShell, onClose: () => void, onTitle: (title: string) => void) {

		this.config = config;

		this.xTerminal = new XTerminalFactory(config);
		this.pty = new PtyFactory();

		const terminal = this.xTerminal.build({

			config: this.config,
		});

		const pty = this.pty.build({

			terminal: terminal,
			shell: shell.path,
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			cwd: require('os').homedir(),
		});

		this.xTerminal.spawn(id, pty, (title: string) => {

			onTitle(title);
		});

		this.pty.listen(terminal, () => {

			this.xTerminal.getFactoryObject().dispose();
			onClose();
		});
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
	 * Write string data to the pty instance.
	 *
	 * @param data - The data to write
	 */
	public write(data: string) {

		this.pty.getFactoryObject().write(data);
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
	shell: IShell;
}
