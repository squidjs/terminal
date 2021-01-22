import { BrowserWindow } from 'electron';
import { Factory } from '@common/factories/Factory';
import { format as formatUrl } from 'url';
import path from 'path';
import { UndefinedObject } from '@common/types/types';
import Config, { IVibrancy } from '@common/config/Config';
import windowStateKeeper, { State } from 'electron-window-state';
import { IConfig } from '@common/config/Config';

export default class WindowFactory implements Factory<BrowserWindow> {

    public factoryObject: UndefinedObject<BrowserWindow>;
    private config: UndefinedObject<IConfig>;
    private readonly DEFAULT_WIDTH = 1200;
    private readonly DEFAULT_HEIGHT = 800;

    constructor(isDev: boolean) {

        const config = Config.getInstance().loadConfig((config) => {

            this.config = config;
            this.setVibrancy(config.vibrancy);
        });

        this.config = config;
        // Build the window after loading the config
        this.factoryObject = this.build();

        this.setVibrancy(config.vibrancy);

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

        let params: Record<string, unknown> = {

            width: this.DEFAULT_WIDTH,
            height: this.DEFAULT_HEIGHT,
        };

        const shouldRestoreWindow = this.config?.restoreWindowPosition;
        let state: UndefinedObject<State> = undefined;

        if(shouldRestoreWindow) {

            state = windowStateKeeper({

                defaultWidth: this.DEFAULT_WIDTH,
                defaultHeight: this.DEFAULT_HEIGHT,
            });

            params = {

                x: state.x,
                y: state.y,
                width: state.width,
                height: state.height,
            };
        }

        const window = new BrowserWindow({

            ...params,
            minWidth: 600,
            minHeight: 500,
            // TODO
            // fix electron bug which make the window un-resizable when
            // transparent is set to true
            // transparent: true,
            maximizable: true,
            resizable: true,
            title: 'Squid',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            icon: path.join(__static, 'logo.png'),
            show: false,
            // TODO
            // fix padding around window caused be electron-acrylic-window
            /*vibrancy: {
                theme: 'appearance-based',
                effect: 'acrylic',
                useCustomWindowRefreshMethod: true,
                maximumRefreshRate: 60,
                disableOnBlur: false,
            },*/
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
            },
        });

        window.setMenuBarVisibility(false);

        if(shouldRestoreWindow)
            state?.manage(window);

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
