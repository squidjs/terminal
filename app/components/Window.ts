import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

const electronIsDev = require('electron-is-dev');
let mainWindow: BrowserWindow;

export default class Window {

    constructor() {

        mainWindow = this.buildWindow();

        this.loadURL();

        mainWindow.on('ready-to-show', () => {

            mainWindow.show();
            mainWindow.focus();
        });

        mainWindow.on('closed', () => mainWindow = null);

        if(electronIsDev)
            this.openDevTools();
    }

    /**
     * Build the main window
     * @return The window
     */
    buildWindow(): BrowserWindow {

        return new BrowserWindow({

            width: 1200,
            height: 800,
            minWidth: 600,
            minHeight: 500,
            frame: false,
            title: 'Squid',
            icon: path.resolve('assets/icons/png/icon.png'),
            show: false,
            backgroundColor: '#0F0F0F',
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true
            }
        });
    }

    /**
     * Load the index.html file
     */
    loadURL() {

        mainWindow.loadURL(url.format({
            pathname: path.resolve('ui/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    /**
     * Open the devtools in detach mode
     */
    openDevTools() {

        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
}
