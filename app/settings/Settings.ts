import * as fs from 'fs';
import * as path from 'path';
import { userDataPath } from './Utils';

export default class Settings {

    private readonly settings: ISettings;
    private readonly path: string;

    constructor() {

        this.path = path.join(userDataPath, 'settings.json');
        this.settings = this.load();
    }

    load(): ISettings {

        try {

            return JSON.parse(fs.readFileSync(this.path).toString());

        } catch (error) {

            return {
                theme: {
                    name: 'default',
                    background: '#0F0F0F',
                    foreground: '#348A37',
                    cursor: '#348A37'
                },
                cursor: {
                    style: 'block',
                    blink: false
                },
                font: {
                    size: 13,
                    family: 'Consolas'
                },
                backgroundImage: {
                    path: '',
                    opacity: 1.0
                },
                bash: '',
                currentTheme: 'default',
                experimentalCharAtlas: 'dynamic'
            }
        }
    }

    save() {

        fs.writeFileSync(this.path, JSON.stringify(this.settings));
    }

    getSettings(): ISettings {

        return this.settings;
    }
}

interface ISettings {

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
