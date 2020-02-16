import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { loadSettings, saveSettings, getDefaultSettings } from './files/file';

const settings = require('electron-settings');
let mainWindow: BrowserWindow;

function createWindow() {

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

    mainWindow.webContents.openDevTools({
        mode: 'detach'
    });

    mainWindow.loadURL(url.format({
        pathname: path.resolve('app/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => mainWindow = null);
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
