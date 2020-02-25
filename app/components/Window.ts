import { BrowserWindow, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';

const electronIsDev = require('electron-is-dev');

export default class Window {

    private mainWindow: BrowserWindow;

    constructor() {

        this.mainWindow = this.buildWindow();

        this.loadURL();

        this.mainWindow.on('ready-to-show', () => {

            this.mainWindow.show();
            this.mainWindow.focus();
        });

        this.mainWindow.on('closed', () => this.mainWindow = null);

        this.mainWindow.webContents.on('new-window', (event, url) => this.openExternalWindow(event, url));

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
            icon: path.resolve('build/icon.png'),
            show: false,
            backgroundColor: '#0F0F0F',
            webPreferences: {
                nodeIntegration: true
            }
        });
    }

    /**
     * Get the main window
     * @return The window
     */
    getWindow(): BrowserWindow {

        return this.mainWindow;
    }

    /**
     * Load the index.html file
     */
    loadURL() {

        this.mainWindow.loadURL(url.format({
            pathname: path.resolve(__dirname, '../../ui/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    /**
     * Open the devtools in detach mode
     */
    openDevTools() {

        this.mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    openExternalWindow(event: Event, url: string) {

        event.preventDefault();

        shell.openExternal(url);
    }
}
