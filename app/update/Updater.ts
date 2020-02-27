import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import * as path from 'path';
import { ipcMain } from 'electron';
import Window  from '../components/Window';

const electronIsDev = require('electron-is-dev');

export default class Updater {

    private window: Window;

    constructor(window: Window) {

        this.window = window;

        log.transports.file.level = 'debug';
        autoUpdater.logger = log;

        if(electronIsDev)
            autoUpdater.updateConfigPath = path.resolve('private/dev-app-update.yml');

        this.checkForUpdates();
    }

    /**
     * Check for any available updates
     */
    checkForUpdates() {

        autoUpdater.checkForUpdates();

        autoUpdater.on('update-not-available', () => this.window.getWindow().webContents.send('update:latest'));
        autoUpdater.on('download-progress', (info) => this.window.getWindow().webContents.send('update:download', info.percent));
        autoUpdater.on('update-downloaded', () => this.window.getWindow().webContents.send('update:ready'));

        ipcMain.on('update:apply', () => autoUpdater.quitAndInstall());
    }
}
