import { BrowserWindow } from 'electron-acrylic-window';
import { Factory } from '../../common/factories/Factory';
import { format as formatUrl } from 'url';
import path from 'path';
import { UndefinedObject } from '../../common/types/types';
import Config, { IVibrancy } from '../../common/config/Config';

export default class WindowFactory implements Factory<BrowserWindow> {

	public factoryObject: UndefinedObject<BrowserWindow>;

	constructor(isDev: boolean) {

		this.factoryObject = this.build();

		Config.getInstance().loadConfig(({ vibrancy }) => {

			this.setVibrancy(vibrancy);

		}).then(({ vibrancy }) => {

			this.setVibrancy(vibrancy);
		});

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
			maximizable: true,
			title: 'Squid',
			titleBarStyle: 'hiddenInset',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			icon: path.join(__static, 'logo.png'),
			show: false,
			vibrancy: {
				theme: 'appearance-based',
				effect: 'acrylic',
				useCustomWindowRefreshMethod: true,
				maximumRefreshRate: 60,
				disableOnBlur: false,
			},
			webPreferences: {
				nodeIntegration: true,
				webSecurity: false,
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
	 * Set the vibrancy settings for this window.
	 *
	 * @param vibrancy - The vibrancy settings
	 */
	private setVibrancy(vibrancy: IVibrancy) {

		if(vibrancy.enabled) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.getFactoryObject().setVibrancy({

				theme: vibrancy.theme,
				effect: vibrancy.effect,
				useCustomWindowRefreshMethod: vibrancy.useCustomWindowRefreshMethod,
				maximumRefreshRate: vibrancy.maximumRefreshRate,
				disableOnBlur: vibrancy.disableOnBlur,
			});

		} else {

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.getFactoryObject().setVibrancy();
		}
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
