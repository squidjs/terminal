import { BrowserWindow } from 'electron';
import { Factory } from '../../common/factories/Factory';
import { format as formatUrl } from 'url';
import path from 'path';
import { UndefinedObject } from '../../common/types/types';

export default class WindowFactory implements Factory<BrowserWindow> {

	public factoryObject: UndefinedObject<BrowserWindow>;

	constructor(isDev: boolean) {

		this.factoryObject = this.build();

		// Open the devtools if we are in dev
		if(isDev)
			this.factoryObject.webContents.openDevTools();

		this.loadWindow(isDev);
	}

	/**
	 * Build a BrowserWindow object and return it back.
	 *
	 * @returns The BrowserWindow instance
	 */
	public build(): BrowserWindow {

		const window = new BrowserWindow({

			width: 1200,
			height: 800,
			minWidth: 600,
			minHeight: 500,
			frame: process.platform === 'darwin',
			transparent: true,
			title: 'Squid',
			titleBarStyle: 'hiddenInset',
			//icon: path.join(__static, 'logo.png'),
			show: false,
			webPreferences: {
				nodeIntegration: true,
			},
		});

		window.on('closed', () => {

			this.factoryObject = undefined;
		});

		window.on('ready-to-show', () => {

			window.show();
			window.focus();
		});

		return window;
	}

	/**
	 * Load the index.html in the window.
	 *
	 * @param isDev - If we are in dev
	 */
	private loadWindow(isDev: boolean) {

		if(!this.factoryObject)
			return;

		if(isDev)
			this.factoryObject.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
		else {

			this.factoryObject.loadURL(formatUrl({

				pathname: path.join(__dirname, 'index.html'),
				protocol: 'file',
				slashes: true,
			}));
		}
	}

	/**
	 * Get the instance of the built object.
	 *
	 * @returns The BrowserWindow instance
	 */
	public getFactoryObject(): BrowserWindow {

		return this.factoryObject as BrowserWindow;
	}
}
