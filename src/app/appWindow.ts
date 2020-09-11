import { AcrylicBrowserWindowConstructorOptions, BrowserWindow } from 'electron-acrylic-window';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { IOptions } from '@/options/options';
import { BrowserWindow as EBrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';

type Window = BrowserWindow | EBrowserWindow;

export default class AppWindow {

    // The instance of the BrowserWindow
    private readonly window: Window;

    constructor(options: IOptions) {

        // Build the window
        this.window = this.buildWindow(options);

        // Load the url
        this.loadUrl();

        // Show and focus the window when ready
        this.window.on('ready-to-show', () => {

            this.window.show();
            this.window.focus();
        });
    }

    /**
     * Build the window instance.
     *
     * @returns The Window instance
     */
    private buildWindow(options: IOptions): Window {

        const windowState: windowStateKeeper.State = windowStateKeeper({

            defaultWidth: 1200,
            defaultHeight: 800,
        });

        // The parameters for the window
        const params: AcrylicBrowserWindowConstructorOptions = {

            width: windowState.width,
            height: windowState.height,
            x: windowState.x,
            y: windowState.y,
            minWidth: 600,
            minHeight: 500,
            frame: process.platform === 'darwin',
            transparent: true,
            title: 'Squid',
            titleBarStyle: 'hiddenInset',
            // @ts-ignore
            icon: path.join(__static, 'logo.png'),
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
            vibrancy: options.vibrancy,
        };

        // If we should add vibrancy to the window
        const vibrancyEnabled = options.vibrancy.enabled;

        // If vibrancy is enabled, return BrowserWindow
        // from electron-acrylic-window, else return
        // electron's BrowserWindow
        const window: Window = (vibrancyEnabled ? new BrowserWindow(params as AcrylicBrowserWindowConstructorOptions) : new EBrowserWindow(params));

        // Manage the window to save it properties.
        windowState.manage(window);

        return window;
    }

    /**
     * Load the index.html file.
      */
    private loadUrl() {

        if(process.env.WEBPACK_DEV_SERVER_URL) {

            this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)

            if(!process.env.IS_TEST)
                this.openDevTools()

        } else {

            createProtocol('app')

            this.window.loadURL('app://./index.html')
        }
    }

    /**
     * Get the BrowserWindow instance.
     *
     * @returns The BrowserWindow instance
     */
    public getWindow(): BrowserWindow {

        return this.window;
    }

    /**
     * Open the dev tools.
     */
    private openDevTools() {

        this.window.webContents.openDevTools({ mode: 'detach' });
    }
}
