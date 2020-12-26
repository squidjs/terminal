import { Addon, AddonType } from './Addons';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { WebglAddon } from 'xterm-addon-webgl';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { ITerminalAddon, Terminal as XTerminal } from 'xterm';
import { shell } from 'electron';
import { IConfig } from '../../common/config/Config';

export default class AddonsProvider {

	private ADDONS: Addon[] = [
		this.buildAddon(AddonType.FIT),
		this.buildAddon(AddonType.UNICODE),
		this.buildAddon(AddonType.LIGATURES),
		this.buildAddon(AddonType.WEBGL),
		this.buildAddon(AddonType.WEBLINKS),
	];

	/**
	 * Setup all addons to the xterm instance.
	 *
	 * @param config - The config to use
	 * @param terminal - The xterm instance
	 */
	public setupAddons(config: IConfig, terminal: XTerminal) {

		this.ADDONS.forEach((addon) => this.setupAddon(config, terminal, addon));
	}

	/**
	 * Setup a single addon to the terminal instance.
	 *
	 * @param config - The config to use
	 * @param terminal - The terminal instance
	 * @param addon - The addon to setup
	 */
	private setupAddon(config: IConfig, terminal: XTerminal, addon: Addon) {

		if(addon && (addon.type !== AddonType.WEBGL || config.webGlRendering)) {

			addon.loaded = true;
			terminal.loadAddon(addon.addon);

			if(addon.type === AddonType.UNICODE)
				terminal.unicode.activeVersion = '11';
		}
	}

	/**
	 * Retrieve a specific addon with it type. Can be null if
	 * the addon is not found.
	 *
	 * @see AddonType
	 *
	 * @param addonType - The type of the addon to retrieve
	 * @returns The instance of the addon or null if not found.
	 */
	public getAddon<T extends ITerminalAddon>(addonType: AddonType): T | null {

		const foundAddon = this.ADDONS.find((current) => current.type === addonType);

		if(foundAddon)
			return foundAddon.addon as T;

		return null;
	}

	/**
	 * Build an Addon by default with loaded to false.
	 *
	 * @param addonType - The type of the addon to build
	 */
	private buildAddon(addonType: AddonType): Addon {

		return {

			type: addonType,
			addon: this.resolveAddonFromType(addonType),
			loaded: false,
		};
	}

	/**
	 * Resolve an addon from its type.
	 *
	 * @see ITerminalAddon
	 * @param addonType - The type of the addon to resolve
	 */
	private resolveAddonFromType(addonType: AddonType): ITerminalAddon {

		switch(addonType) {

			case AddonType.FIT:
				return new FitAddon();
			case AddonType.UNICODE:
				return new Unicode11Addon();
			case AddonType.LIGATURES:
				return new LigaturesAddon();
			case AddonType.WEBGL:
				return new WebglAddon();
			case AddonType.WEBLINKS:
				return new WebLinksAddon((event, uri) => {

					shell.openExternal(uri);
				});
		}
	}
}
