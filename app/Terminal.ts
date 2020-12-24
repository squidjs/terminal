import XTerminalFactory from './factories/XTerminalFactory';
import PtyFactory from './factories/PtyFactory';
import { IConfig } from '../common/config/Config';

export default class Terminal {

	private config: IConfig;

	private xTerminal: XTerminalFactory;
	private pty: PtyFactory;

	constructor(config: IConfig, id: number, onClose: () => void, onTitle: (title: string) => void) {

		this.config = config;

		this.xTerminal = new XTerminalFactory(config);
		this.pty = new PtyFactory();

		const terminal = this.xTerminal.build({

			config: this.config,
		});

		const pty = this.pty.build({

			terminal: terminal,
			shell: config.shell,
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
	}
}

export interface ITerminal {

	id: number;
	name: string;
}
