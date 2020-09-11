import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class Updater {

    constructor() {

        log.transports.file.level = 'debug';
        autoUpdater.logger = log;

        autoUpdater.checkForUpdatesAndNotify();
    }
}
