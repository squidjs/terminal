import * as path from 'path';
import * as fs from 'fs';
import { userDataPath } from '@common/utils/utils';
import { defaultConfig } from '@common/config/defaultConfig';
import watch from 'node-watch';
import { VibrancyEffect, VibrancyTheme } from 'electron-acrylic-window';
import { FontWeight } from 'xterm';
import { UndefinedObject } from '@common/types/types';
import { IShortcut } from '@common/config/shortcuts';

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

        if(this.config) {

            this.watchFile(callback);
            return this.config;
        }

        let config;

        if(fs.existsSync(this.CONFIG))
            config = this.readFile();
        else {

            this.saveFile(defaultConfig);
            config = defaultConfig;
        }

        this.watchFile(callback);

        return config;
    }

    /**
     * Watch the config file for changes.
     *
     * @param callback - A callback called when the file has changed
     */
    private watchFile(callback?: (newConfig: IConfig) => void) {

        if(callback != undefined) {

            const watcher = watch(this.CONFIG, { recursive: false });

            watcher.on('change', async () => {

                const newConfig = await this.readFile();
                callback(newConfig);
            });
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
    webGlRendering: boolean;
    /**
     * If we should copy to the clipboard the
     * selected text on copy.
     */
    copyOnSelected: boolean;
    /**
     * If we should restore the window position
     * and size when re-launching the app.
     */
    restoreWindowPosition: boolean;
    /**
     * If we should render icons next the tabs titles.
     */
    tabsIcons: boolean;
    bell: IBell;
    cursor: ICursor;
    font: IFont
    scroll: IScroll;
    backgroundImage: IBackgroundImage;
    vibrancy: IVibrancy;
    shortcuts: IShortcut[];
    localSSHHosts: ISSHHost[];
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

export interface IShell extends HasEnv {
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

export interface ISSHHost extends HasEnv {
    /**
     * The name to use for this ssh host.
     */
    name: string;
    /**
     * The hostname to use.
     */
    host: string;
    /**
     * The port to use.
     */
    port: number;
    /**
     * The username to connect with.
     */
    username: string;
    /**
     * The optional password to use. If
     * not set, that mean you should use
     * a private key.
     */
    password?: string;
    /**
     * The path to the private key to use.
     * If not set, that mean you should use
     * a password.
     */
    privateKey?: string;
}

export interface HasEnv {
    /**
     * Represent optional env variables to use for specific
     * SSH or Shell hosts.
     */
    env?: { [key: string]: string };
}

export interface IProfile {
    /**
     * Represent a profile tab.
     */
    profile: true;
}
