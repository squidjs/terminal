import { Addon, AddonType } from './Addons';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import { WebglAddon } from 'xterm-addon-webgl';
import { ITerminalAddon, Terminal as XTerminal } from 'xterm';

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
	];

	/**
	 * Setup all addons to the xterm instance.
	 *
	 * @param terminal - The xterm instance
	 */
	public setupAddons(terminal: XTerminal) {

		this.ADDONS.forEach((addon) => {

			terminal.loadAddon(addon.addon);
		});
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
