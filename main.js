const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

const settings = require('electron-settings');

const path = require('path');
const url = require('url');

const fs = require('fs');

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({

        width: 1200,
        height: 800,
        minWidth: 600,
        minHeight: 500,
        frame: false,
        title: 'Squid',
        icon: __dirname + '/images/64x64.png',
        show: false,
        transparent: true,
        webPreferences: {
          nodeIntegration: true,
          experimentalFeatures: true
        }
    });

    mainWindow.webContents.openDevTools({

        mode: 'detach'
    });

    mainWindow.loadURL(url.format({

        pathname: path.join(__dirname, './views/index.html'),
        protocol: 'file:',
        slashes: true
      }));

    mainWindow.on('ready-to-show', () => {

        mainWindow.show();
    });

    mainWindow.on('closed', () => {

        window = null
    });
}

app.disableHardwareAcceleration();

app.on('ready', () => {

    createWindow();

    settings.set('options', loadSettings('settings'));
    settings.set('theme', loadSettings('theme'));
    settings.set('shortcuts', loadSettings('shortcuts'));

    let shortcuts = settings.get('shortcuts');

    for(let [type, accelerator] of Object.entries(shortcuts))
        globalShortcut.register(accelerator, () => mainWindow.webContents.send('keypress', type));

});

app.on('window-all-closed', () => {

    saveSettings('settings', settings.get('options'));
    saveSettings('theme', settings.get('theme'));
    saveSettings('shortcuts', settings.get('shortcuts'));

    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {

    if(mainWindow === null)
        createWindow();
});

ipcMain.on('rebind', (event, data) => {

   globalShortcut.unregister(data.oldAccelerator);
   globalShortcut.register(data.newAccelerator, () => mainWindow.webContents.send('keypress', data.type));
});

ipcMain.on('removeTheme', (event) => {

    event.returnValue = getDefaultSettings('theme');
});

function loadSettings(file) {

    if(fs.existsSync('./' + file + '.json'))
        return JSON.parse(fs.readFileSync('./' + file + '.json'));
    else
        return getDefaultSettings(file);
}

function saveSettings(file, data) {

    fs.writeFileSync('./' + file + '.json', JSON.stringify(data));
}

function getDefaultSettings(file) {

    if(file == 'settings') {

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

    } else if(file == 'theme') {

        return {

            background: '#191919',
            foreground: '#ACBAC9',
            cursor: '#7d07b4'
        };

    } else if(file == 'shortcuts') {

        return {

            closeTab: 'Control+W',
            openTab: 'Control+T',
            switchTab: 'Control+Tab',
            openSettings: 'Control+Enter'
        };
    }
}