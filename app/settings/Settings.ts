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

    get(key: string): string | boolean | number {

        return this.settings[key];
    }

    set(key: string, value: object) {

        this.settings[key] = value;

        save(this.path, this.settings);
    }

    load(): ISettings {

        try {

            return JSON.parse(fs.readFileSync(this.path).toString());

        } catch (error) {

            return <ISettings>defaultConfig;
        }
    }
}

function save(path: string, settings: ISettings) {

    fs.writeFileSync(path, JSON.stringify(settings));
}

export interface ISettings {

    theme: ITheme;
    cursor: ICursor;
    font: IFont;
    backgroundImage: IBackgroundImage;
    bash: string;
    currentTheme: string;
    experimentalCharAtlas: 'none' | 'static' | 'dynamic';
}

interface ITheme {

    name: string;
    background: string;
    foreground: string;
    cursor: string;
}

interface ICursor {

    style: 'block' | 'underline' | 'bar';
    blink: boolean;
}

interface IFont {

    size: number;
    family: string;
}

interface IBackgroundImage {

    path: string;
    opacity: number;
}
