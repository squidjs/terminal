import { UndefinedObject } from '../../common/types/types';
import WindowFactory from '../window/WindowFactory';
import { app } from 'electron';

export default class App {

	private readonly isDev: boolean;
	private window: UndefinedObject<WindowFactory>;

	constructor(isDev: boolean) {

		this.isDev = isDev;

		this.listenAppEvents();
	}

	/**
	 * Create the factory for the window of this app.
	 *
	 * @see WindowFactory
	 */
	private createWindow() {

		this.window = new WindowFactory(this.isDev);
	}

	/**
	 * Listen for general app events to create the window,
	 * quit the app...
	 */
	private listenAppEvents() {

		app.on('window-all-closed', () => {

			if(process.platform !== 'darwin')
				app.quit();
		});

		app.on('activate', () => {

			if(this.window?.getFactoryObject() === null)
				this.createWindow();
		});

		app.on('ready', () => {

			this.createWindow();
		});
	}
}
