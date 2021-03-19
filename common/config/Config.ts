import * as path from 'path';
import * as fs from 'fs';
import { homePath } from '@common/utils/utils';
import { defaultConfig } from '@common/config/defaultConfig';
import { FontWeight } from 'xterm';
import { UndefinedObject } from '@common/types/types';
import { IShortcut } from '@common/shortcuts/shortcuts';
import { callTrigger } from '@common/plugins/plugins';
import { getProcessTrigger } from '@common/plugins/hooks';
import { lazyload } from '@common/utils/lazyload';
import type watch from 'node-watch';

const lazyNodeWatch = lazyload<typeof watch>('node-watch');

export default class Config {

    // Create a singleton instance of this object
    private static instance: Config = new Config();
    private readonly CONFIG: string = path.join(homePath, '.squidrc.json');

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
    public loadConfig(callback?: (newConfig: UndefinedObject<IConfig>) => void): IConfig {

        const exist = fs.existsSync(this.CONFIG);

        if(this.config && exist) {

            this.watchFile(callback);
            return this.config;
        }

        let config;

        if(exist) {

            config = this.readFile();
            this.watchFile(callback);

        } else {

            this.saveFile(defaultConfig, () => this.watchFile(callback));
            config = defaultConfig;
        }

        return config;
    }

    /**
     * Watch the config file for changes.
     *
     * @param callback - A callback called when the file has changed
     */
    private watchFile(callback?: (newConfig: UndefinedObject<IConfig>) => void) {

        if(callback != undefined) {

            const watcher = lazyNodeWatch()(this.CONFIG, { recursive: false });

            watcher.on('change', async () => {

                try {

                    const newConfig = await this.readFile();
                    callback(newConfig);

                } catch (err) {

                    callback(undefined);
                }
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
        let config: IConfig = JSON.parse(data.toString());

        const { param } = callTrigger('hookConfig', getProcessTrigger(config));
        config = param;

        this.config = config;

        return config;
    }

    /**
     * Save the desired Config object to a file.
     *
     * @param config - The config to save
     * @param done - A callback executed when the file is saved
     */
    private saveFile(config: IConfig, done: () => void) {

        fs.writeFile(this.CONFIG, JSON.stringify(config, null, 2), (err) => {

            if(err) {

                console.log(err);
                return;
            }

            done();
        });
    }

    /**
     * Read the config file synchronously without hooking.
     *
     * @returns A IConfig
     */
    public getHooklessConfig(): IConfig {

        const data = fs.readFileSync(this.CONFIG);
        return JSON.parse(data.toString());
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
    /**
     * If we should move the cursor with alt+click
     */
    altClickMoveCursor: boolean;
    /**
     * If the vibrancy is enabled.
     */
    vibrancy: boolean;
    /**
     * Additional CSS to add.
     */
    css: string;
    bell: IBell;
    cursor: ICursor;
    font: IFont
    scroll: IScroll;
    backgroundImage: IBackgroundImage;
    shortcuts: IShortcut[];
    localSSHHosts: ISSHHost[];
    /**
     * The url to use for the cloud.
     */
    cloudUrl: string;
    /**
     * The list of names of enabled plugin and theme.
     */
    plugins: string[];
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
