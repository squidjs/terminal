import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import * as path from 'path';
import { webContents, ipcMain } from 'electron';

const electronIsDev = require('electron-is-dev');

export default class Updater {

    private progress: number;

    constructor() {

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

        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('update-available', () => console.log('update available'));
        autoUpdater.on('download-progress', (info) => this.progress = info.percent);
        autoUpdater.on('update-downloaded', () => webContents.getFocusedWebContents().send('update:ready'));

        ipcMain.on('update:apply', () => autoUpdater.quitAndInstall());
    }
}
