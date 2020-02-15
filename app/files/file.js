const fs = require('fs');
const { app } = require('electron');

const loadSettings = (file) => {

    if(fs.existsSync(getHome() + '/' + file + '.json'))
        return JSON.parse(fs.readFileSync(getHome() + '/' + file + '.json'));
    else
        return getDefaultSettings(file);
};

const saveSettings = (file, data) => {

    fs.writeFileSync(getHome() + '/' + file + '.json', JSON.stringify(data));
};

const getDefaultSettings = (file) => {

    if(file === 'settings') {

        return {

            fontSize: '13',
            fontFamily: 'Consolas',
            backgroundImage: '',
            backgroundImageOpacity: '0.5',
            bash: 'C:\\Program Files\\Git\\\\bin\\bash.exe',
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

module.exports.loadSettings = loadSettings;
module.exports.saveSettings = saveSettings;
module.exports.getDefaultSettings = getDefaultSettings;
