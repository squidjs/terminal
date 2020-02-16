import * as fs from 'fs';
import { app } from 'electron';

export const loadSettings = (file) => {

    if(fs.existsSync(getHome() + '/' + file + '.json'))
        return JSON.parse(fs.readFileSync(getHome() + '/' + file + '.json').toString());
    else
        return getDefaultSettings(file);
};

export const saveSettings = (file, data) => {

    fs.writeFileSync(getHome() + '/' + file + '.json', JSON.stringify(data));
};

export const getDefaultSettings = (file) => {

    if(file === 'settings') {

        return {

            fontSize: '13',
            fontFamily: 'Consolas',
            backgroundImage: '',
            backgroundImageOpacity: '0.5',
            bash: 'C:\\Program Files\\Git\\bin\\bash.exe',
            cursorStyle: 'block',
            cursorBlink: false,
            themeName: 'Default',
            experimentalCharAtlas: 'dynamic',
            allowTransparency: true
        };

    } else if(file === 'theme') {

        return {

            background: '#0F0F0F',
            foreground: '#348A37',
            cursor: '#348A37'
        };
    }
};

function getHome() {

    return app.getPath('userData');
}
