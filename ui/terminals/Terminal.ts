import XTerminalFactory from './factories/XTerminalFactory';
import PtyFactory from './factories/PtyFactory';
import { Terminal as XTerminal } from 'xterm';
import { IPty } from 'node-pty';
import { clipboard } from 'electron';
import { UndefinedObject } from '../../common/types/types';
import { FitAddon } from 'xterm-addon-fit';

export default class Terminal {

	private xTerminal: XTerminalFactory;
	private pty: PtyFactory;
	private fitAddon: UndefinedObject<FitAddon>;

	constructor() {

		this.xTerminal = new XTerminalFactory();
		this.pty = new PtyFactory();

		const terminal = this.xTerminal.build();
		const pty = this.pty.build({

			terminal: terminal,
			cwd: require('os').homedir(),
		});

		this.spawnTerminal();
		this.terminalListen(terminal, pty);
		this.ptyListen(terminal, pty);

		window.onresize = () => this.fit();

		this.fit();
	}

	private spawnTerminal() {

		const terminalElement = document.getElementById('terminal');

		if(terminalElement)
			this.xTerminal.getFactoryObject().open(terminalElement);

		this.xTerminal.getFactoryObject().loadAddon(this.fitAddon = new FitAddon());
	}

	private terminalListen(terminal: XTerminal, pty: IPty) {

		terminal.onData((data: string) => {

			pty.write(data);
		});

		terminal.onResize((data: {cols: number, rows: number}) => {

			pty.resize(
				Math.max(data ? data.cols : terminal.cols, 1),
				Math.max(data ? data.rows : terminal.rows, 1));
		});

		terminal.onTitleChange((title: string) => {

			// TODO
		});

		terminal.onSelectionChange(() => clipboard.writeText(terminal.getSelection(), 'selection'));
	}

	private ptyListen(terminal: XTerminal, pty: IPty) {

		pty.onData((data: string) => {

			terminal.write(data);
		});

		pty.onExit(() => {

			// TODO
		});
	}

	private fit() {

		this.fitAddon?.fit();
	}
}
