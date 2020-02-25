import * as fs from 'fs';
import * as path from 'path';
import { userDataPath } from './Utils';
import { defaultConfig } from '../config/defaultConfig';

export default class Settings {

    private settings: ISettings;
    private readonly path: string;

    constructor() {

        this.path = path.join(userDataPath, 'settings.squid.json');
        this.settings = this.load();
    }

    /**
     * Get the value of a key
     * @param key
     * @return The value from the key
     */
    get(key: string): string | boolean | number | any {

        let value = this.settings[key];

        if(value === undefined)
            value = defaultConfig[key];

        return value;
    }

    /**
     * Set the value for a key
     * @param key
     * @param value
     */
    set(key: string, value: object) {

        this.settings[key] = value;

        save(this.path, this.settings);
    }

    /**
     * Load the settings
     * @return The loaded settings
     */
    load(): ISettings {

        try {

            return JSON.parse(fs.readFileSync(this.path).toString());

        } catch (error) {

            return defaultConfig;
        }
    }

    /**
     * Does the settings file exist ?
     * @return If the settings file exist
     */
    exists(): boolean {

        return fs.existsSync(this.path);
    }

    /**
     * Get the path of the file
     * @return The path to the file
     */
    getPath(): string {

        return this.path;
    }

    /**
     * Get the settings
     * @return The settings
     */
    getSettings(): ISettings {

        return this.settings;
    }

    /**
     * Update the settings
     * @param settings
     */
    setSettings(settings: ISettings) {

        this.settings = settings;
    }
}

/**
 * Save the settings to a file
 * @param path
 * @param settings
 */
export function save(path: string, settings: ISettings) {

    fs.writeFileSync(path, JSON.stringify(settings, null, 2));
}

export interface ISettings {

    /**
     * The theme interface
     */
    theme: ITheme;

    /**
     * The cursor interface
     */
    cursor: ICursor;

    /**
     * The font interface
     */
    font: IFont;

    /**
     * The background image interface
     */
    backgroundImage: IBackgroundImage;

    /**
     * A path to the bash you which to use
     */
    bash: string;

    /**
     * The name of the current theme
     */
    currentTheme: string;

    /**
     * The key to toggle the fast scroll
     */
    fastScrollModifier: 'alt' | 'ctrl' | 'shift';

    /**
     * A list of the shortcuts
     */
    shortcuts: IShortcut[];
}

export interface ITheme {

    /**
     * The theme name
     */
    name: string;

    /**
     * Bellow are the colors of the theme
     */
    background: string;
    foreground: string;
    cursor: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    lightBlack: string;
    lightRed: string;
    lightGreen: string;
    lightYellow: string;
    lightBlue: string;
    lightMagenta: string;
    lightCyan: string;
    lightWhite: string;
}

interface ICursor {

    /**
     * The style of the cursor
     */
    style: 'block' | 'underline' | 'bar';

    /**
     * Does the cursor should blink or not
     */
    blink: boolean;
}

interface IFont {

    /**
     * The size of the font in the terminal
     */
    size: number;

    /**
     * The family of the font in the terminal
     */
    family: string;
}

interface IBackgroundImage {

    /**
     * The path to the background image
     */
    path: string;

    /**
     * The opacity of the background image
     */
    opacity: number;
}

export type IShortcutType = 'pane:open' | 'pane:close' | 'pane:switch';

export interface IShortcut {

    /**
     * The keys that needs to be pressed
     */
    keys: string;

    /**
     * The desired action
     */
    action: IShortcutType;
}
