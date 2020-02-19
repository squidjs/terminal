import * as fs from 'fs';
import * as path from 'path';
import { userDataPath } from './Utils';
import defaultConfig from '../config/defaultConfig';

export default class Settings {

    private readonly settings: ISettings;
    private readonly path: string;

    constructor() {

        this.path = path.join(userDataPath, 'settings.json');
        this.settings = this.load();
    }

    /**
     * Get the value of a key
     * @param key
     * @return The value from the key
     */
    get(key: string): string | boolean | number {

        return this.settings[key];
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

            return <ISettings>defaultConfig;
        }
    }
}

/**
 * Save the settings to a file
 * @param path
 * @param settings
 */
function save(path: string, settings: ISettings) {

    fs.writeFileSync(path, JSON.stringify(settings));
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
     * Use or not the experimental char atlas
     */
    experimentalCharAtlas: 'none' | 'static' | 'dynamic';
}

interface ITheme {

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
