import { ITerminalAddon, Terminal as XTerminal } from 'xterm';
import { Factory } from '../../../common/factories/Factory';
import { UndefinedObject } from '../../../common/types/types';
import { IPty } from 'node-pty';
import { clipboard } from 'electron';
import { FitAddon } from 'xterm-addon-fit';
import { AddonType } from '../addons/Addons';
import AddonsProvider from '../addons/AddonsProvider';
import { IConfig } from '../../config/Config';

export default class XTerminalFactory implements Factory<XTerminal> {

	public factoryObject: UndefinedObject<XTerminal>;
	private addonsProvider: AddonsProvider;

	constructor() {

		this.addonsProvider = new AddonsProvider();
	}

	/**
	 * Build a XTerminal object with params.
	 *
	 * @see XTerminalFactoryParams
	 *
	 * @param params - XTerminalFactoryParams
	 * @returns The XTerminal instance
	 */
	public build({ config }: XTerminalFactoryParams): XTerminal {

		this.factoryObject = new XTerminal();
		this.loadConfig(config);

		return this.factoryObject;
	}

	/**
	 * Set a option to the xterm instance.
	 *
	 * @param config - The config to load
	 */
	public loadConfig(config: IConfig) {

		const terminal = this.getFactoryObject();
		terminal.setOption('bellSound', config.bell.sound);
		terminal.setOption('bellStyle', config.bell.style);
		terminal.setOption('cursorBlink', config.cursor.blink);
		terminal.setOption('cursorStyle', config.cursor.style);
		terminal.setOption('fontSize', config.font.size);
		terminal.setOption('fontFamily', config.font.family);
		terminal.setOption('scrollSensitivity', config.scrollSensitivity);
		terminal.setOption('fastScrollSensitivity', config.fastScrollSensitivity);
		terminal.setOption('fastScrollModifier', config.fastScrollModifier);
		terminal.setOption('theme', config.theme);
	}

	/**
	 * Spawn the xterm instance, listen for events and
	 * setup addons.
	 *
	 * @param pty - The pty instance to write on
	 */
	public spawn(pty: IPty) {

		const terminalElement = document.getElementById('terminal');

		if(terminalElement)
			this.getFactoryObject().open(terminalElement);

		this.listen(pty);

		this.addonsProvider.setupAddons(this.getFactoryObject());

		this.fit();
	}

	/**
	 * Listen for events on the xterm instance.
	 *
	 * @param pty - The pty instance to write and resize on
	 */
	private listen(pty: IPty) {

		this.getFactoryObject().onData((data: string) => {

			pty.write(data);
		});

		this.getFactoryObject().onResize((data: {cols: number, rows: number}) => {

			pty.resize(
				Math.max(data ? data.cols : this.getFactoryObject().cols, 1),
				Math.max(data ? data.rows : this.getFactoryObject().rows, 1));
		});

		this.getFactoryObject().onTitleChange((title: string) => {

			// TODO
		});

		this.getFactoryObject().onSelectionChange(() => clipboard.writeText(this.getFactoryObject().getSelection(), 'selection'));

		window.onresize = () => this.fit();
	}

	/**
	 * Fit the window thanks to the fit addon.
	 */
	private fit() {

		const fitAddon = this.getAddon<FitAddon>(AddonType.FIT);

		fitAddon?.fit();
	}

	/**
	 * Retrieve a specific addon with it type to the addon provider.
	 *
	 * @see AddonType
	 *
	 * @param addonType - The type of the addon to retrieve
	 * @returns The instance of the addon or null if not found.
	 */
	private getAddon<T extends ITerminalAddon>(addonType: AddonType): T | null {

		return this.addonsProvider.getAddon(addonType);
	}

	/**
	 * Get the instance of the built object.
	 *
	 * @returns The XTerminal instance
	 */
	public getFactoryObject(): XTerminal {

		return this.factoryObject as XTerminal;
	}
}

/**
 * The parameters to build the terminal instance.
 */
export type XTerminalFactoryParams = {

	config: IConfig;
}
