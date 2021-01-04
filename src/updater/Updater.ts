import { autoUpdater } from 'electron-updater';
import { BrowserWindow, ipcMain } from 'electron';
import { IUpdateStatus } from '@common/types/types';

// 5 seconds (in milliseconds)
const WAIT_TIME = 5 * 1000;

export default class Updater {

	constructor() {

		// Listen for updates after the wait time
		setTimeout(() => {

			this.listen();

		}, WAIT_TIME);
	}

	/**
	 * Check for update and listen for updates status change,
	 * and restart request from the renderer process.
	 */
	private listen() {

		autoUpdater.checkForUpdatesAndNotify();

		autoUpdater.on('update-available', () => {

			this.sendUpdate({ updateAvailable: true });
		});

		autoUpdater.on('update-downloaded', () => {

			this.sendUpdate({ readyToInstall: true });
		});

		ipcMain.on('restart', () => {

			autoUpdater.quitAndInstall();
		});
	}

	/**
	 * Send an update status to the renderer process.
	 *
	 * @param update - The update status to send
	 */
	private sendUpdate(update: IUpdateStatus) {

		BrowserWindow.getFocusedWindow()?.webContents.send('update', update);
	}
}
