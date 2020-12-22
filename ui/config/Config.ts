import * as path from 'path';
import * as fs from 'fs';
import { userDataPath } from '../../common/utils/utils';
import { defaultConfig } from './defaultConfig';
import chokidar from 'chokidar';

export default class Config {

	// Create a singleton instance of this object
	private static instance: Config = new Config();
	private readonly CONFIG: string = path.join(userDataPath, 'squid.json');

	/**
	 * Load the config as a Config. If the config file does not exist, we
	 * create it. Else, we return the content of the file.
	 *
	 * @see Config
	 *
	 * @param callback - An optional callback called when the file has changed
	 * @returns A promise of Config
	 */
	public async loadConfig(callback?: (newConfig: IConfig) => void): Promise<IConfig> {

		if(callback != undefined) {

			const watcher = chokidar.watch(this.CONFIG);

			watcher.on('change', async () => {

				const newConfig = await this.readFile();

				if(callback != undefined)
					callback(newConfig);
			});
		}

		return new Promise<IConfig>((resolve) => {

			fs.exists(this.CONFIG, async (exists) => {

				if(exists)
					return resolve(this.readFile());
				else {

					this.saveFile(defaultConfig);
					return defaultConfig;
				}
			});
		});
	}

	/**
	 * Read the config file asynchronously.
	 *
	 * @returns A promise of IConfig
	 */
	private async readFile(): Promise<IConfig> {

		return new Promise<IConfig>((resolve, reject) => {

			fs.readFile(this.CONFIG, (err, data) => {

				if(err)
					reject(err);

				resolve(JSON.parse(data.toString()) as IConfig);
			});
		});
	}

	/**
	 * Save the desired Config object to a file.
	 *
	 * @param config - The config to save
	 */
	private saveFile(config: IConfig) {

		fs.writeFile(this.CONFIG, JSON.stringify(config, null, 2), (err) => {

			if(err)
				console.log(err);
		});
	}

	/**
	 * Get the singleton instance of this Config object.
	 */
	public static getInstance(): Config {

		return Config.instance;
	}
}

export interface IConfig {

	/**
	 * The theme interface.
	 */
	theme: ITheme;
	/**
	 * The bell interface.
	 */
	bell: IBell;
	/**
	 * The cursor interface.
	 */
	cursor: ICursor;
	/**
	 * The font interface.
	 */
	font: IFont;
	/**
	 * The opacity of the window.
	 */
	opacity: number;
	/**
	 * A path to the shell you which to use.
	 */
	shell: string;
	/**
	 * The name of the current theme.
	 */
	currentTheme: string;
	/**
	 * The sensitivity of the scroll.
	 */
	scrollSensitivity: number;
	/**
	 * The sensitivity of the fast scroll.
	 */
	fastScrollSensitivity: number;
	/**
	 * The key to toggle the fast scroll.
	 */
	fastScrollModifier: 'alt' | 'ctrl' | 'shift';
	/**
	 * WebGL rendering.
	 */
	webGlRendering: boolean;
}

export interface ITheme {

	/**
	 * Bellow are the colors of the theme.
	 */
	background: string;
	foreground: string;
	cursor: string;
	cursorAccent: string;
	selection: string;
	black: string;
	red: string;
	green: string;
	yellow: string;
	blue: string;
	magenta: string;
	cyan: string;
	white: string;
	brightBlack: string;
	brightRed: string;
	brightGreen: string;
	brightYellow: string;
	brightBlue: string;
	brightMagenta: string;
	brightCyan: string;
	brightWhite: string;
}

interface IBell {

	sound?: string;
	style: 'none' | 'sound';
}

interface ICursor {
	/**
	 * The style of the cursor.
	 */
	style: 'block' | 'underline' | 'bar';
	/**
	 * Does the cursor should blink or not.
	 */
	blink: boolean;
}

interface IFont {

	/**
	 * The size of the font in the terminal.
	 */
	size: number;
	/**
	 * The family of the font in the terminal.
	 */
	family: string;
}
