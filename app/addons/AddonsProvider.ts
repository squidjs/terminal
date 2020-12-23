import { Addon, AddonType } from './Addons';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { WebglAddon } from 'xterm-addon-webgl';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { ITerminalAddon, Terminal as XTerminal } from 'xterm';
import { shell } from 'electron';
import { IConfig } from '../config/Config';

export default class AddonsProvider {

	private ADDONS: Addon[] = [
		{
			type: AddonType.FIT,
			addon: new FitAddon(),
		},
		{
			type: AddonType.UNICODE,
			addon: new Unicode11Addon(),
		},
		{
			type: AddonType.LIGATURES,
			addon: new LigaturesAddon(),
		},
		{
			type: AddonType.WEBGL,
			addon: new WebglAddon(),
		},
		{
			type: AddonType.WEBLINKS,
			addon: new WebLinksAddon((event, uri) => {

				shell.openExternal(uri);
			}),
		},
	];

	/**
	 * Setup all addons to the xterm instance.
	 *
	 * @param config - The config to use
	 * @param terminal - The xterm instance
	 */
	public setupAddons(config: IConfig, terminal: XTerminal) {

		this.ADDONS.forEach((addon) => {

			if(addon.type !== AddonType.WEBGL || config.webGlRendering)
				terminal.loadAddon(addon.addon);
		});

		terminal.unicode.activeVersion = '11';
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
}
