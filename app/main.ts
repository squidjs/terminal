const { app, BrowserWindow, ipcMain } = require('electron');
const settings = require('electron-settings');
const path = require('path');
const url = require('url');

const { loadSettings, saveSettings, getDefaultSettings } = require('./files/file');

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({

        width: 1200,
        height: 800,
        minWidth: 600,
        minHeight: 500,
        frame: false,
        title: 'Squid',
        icon: __dirname + '/assets/icons/png/icon.png',
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    });

    mainWindow.webContents.openDevTools({ mode: 'detach' });

    mainWindow.loadURL(url.format({

        pathname: path.resolve('app/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => window = null);
}

app.disableHardwareAcceleration();

app.on('ready', () => {

    createWindow();

    settings.set('options', loadSettings('settings'));
    settings.set('theme', loadSettings('theme'));
});

app.on('window-all-closed', () => {

    saveSettings('settings', settings.get('options'));
    saveSettings('theme', settings.get('theme'));

    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {

    if(mainWindow === null)
        createWindow();
});

ipcMain.on('removeTheme', (event) => {

    event.returnValue = getDefaultSettings('theme');
});
