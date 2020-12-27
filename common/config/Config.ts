import * as path from 'path';
import * as fs from 'fs';
import { userDataPath } from '../utils/utils';
import { defaultConfig } from './defaultConfig';
import watch from 'node-watch';
import { VibrancyEffect, VibrancyTheme } from 'electron-acrylic-window';
import { FontWeight } from 'xterm';
import { UndefinedObject } from '../types/types';
import { IShortcut } from './shortcuts';

export default class Config {

	// Create a singleton instance of this object
	private static instance: Config = new Config();
	private readonly CONFIG: string = path.join(userDataPath, 'squid.json');

	// A cache of the config
	private config: UndefinedObject<IConfig>;

	/**
	 * Load the config as a Config. If the config file does not exist, we
	 * create it. Else, we return the content of the file.
	 *
	 * @see Config
	 *
	 * @param callback - An optional callback called when the file has changed
	 * @returns The loaded config
	 */
	public loadConfig(callback?: (newConfig: IConfig) => void): IConfig {

		if(callback != undefined) {

			const watcher = watch(this.CONFIG, { recursive: false });

			watcher.on('change', async () => {

				const newConfig = await this.readFile();
				callback(newConfig);
			});
		}

		if(this.config)
			return this.config;

		if(fs.existsSync(this.CONFIG))
			return this.readFile();
		else {

			this.saveFile(defaultConfig);
			return defaultConfig;
		}
	}

	/**
	 * Read the config file synchronously.
	 *
	 * @returns A IConfig
	 */
	private readFile(): IConfig {

		const data = fs.readFileSync(this.CONFIG);
		const config: IConfig = JSON.parse(data.toString());

		this.config = config;

		return config;
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
	theme: ITheme;
	/**
	 * Default shell to use.
	 */
	defaultShell: IShell;
	/**
	 * List of available shells
	 */
	shells: IShell[];
	/**
	 * If we should enable webgl rendering.
	 * Enable it would cause the ligatures
	 * addon to not work properly.
	 */
	webGlRendering: boolean,
	bell: IBell;
	cursor: ICursor;
	font: IFont
	scroll: IScroll;
	backgroundImage: IBackgroundImage;
	vibrancy: IVibrancy;
	shortcuts: IShortcut[];
}

export interface ITheme {
	/**
	 * Bellow are the colors of the theme.
	 */
	background: string;
	border: string;
	text: string;
	textHover: string;
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

export interface IShell {
	/**
	 * The name to display of this shell.
	 */
	name: string;
	/**
	 * The path to this shell.
	 */
	path: string;
}

interface IBell {
	/**
	 * IF the bell sound is enabled.
	 */
	enabled: boolean;
	/**
	 * A link to the sound url.
	 */
	sound: string;
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
	/**
	 * The width in px of the cursor
	 */
	width: number;
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
	/**
	 * The default text weight.
	 */
	weight: FontWeight;
	/**
	 * The bold text weight.
	 */
	weightBold: FontWeight;
	/**
	 * The letter spacing in px.
	 */
	letterSpacing: number;
	/**
	 * The line height.
	 */
	lineHeight: number;
}

interface IScroll {
	/**
	 * The default scroll sensitivity.
	 */
	sensitivity: number;
	/**
	 * The fast scroll sensitivity.
	 */
	fastScrollSensitivity: number;
	/**
	 * The key to enable fast scroll.
	 */
	fastScrollModifier: string;
}

interface IBackgroundImage {
	/**
	 * If we should enable the background image.
	 */
	enabled: boolean;
	/**
	 * The opacity of the image/gif.
	 */
	opacity: number;
	/**
	 * Path or link to the image/gif to use.
	 */
	image: string;
}

export interface IVibrancy {
	/**
	 * If the vibrancy is enabled.
	 */
	enabled: boolean;
	/**
	 * The theme to use.
	 */
	theme: VibrancyTheme;
	/**
	 * The effect to use.
	 */
	effect: VibrancyEffect;
	/**
	 * If we should use a custom windows refresh method.
	 */
	useCustomWindowRefreshMethod: boolean;
	/**
	 * Maximum refresh rate. Default to 60.
	 */
	maximumRefreshRate: number;
	/**
	 * If we should disable when the window is blurred.
	 */
	disableOnBlur: boolean;
}
