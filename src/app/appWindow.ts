// @ts-ignore
import { BrowserWindow } from 'electron-acrylic-window';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { IOptions } from '@/options/options';
import { BrowserWindow as EBrowserWindow, BrowserWindowConstructorOptions } from 'electron';

type Window = BrowserWindow | EBrowserWindow;

export default class AppWindow {

    // The instance of the BrowserWindow
    private readonly window: Window;

    constructor(options: IOptions) {

        // Buil the window
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
     * Build the window instance
     *
     * @return BrowserWindow
     */
    private buildWindow(options: IOptions): Window {

        // The parameters for the window
        const params: BrowserWindowConstructorOptions = {

            width: 1200,
            height: 800,
            minWidth: 600,
            minHeight: 500,
            frame: process.platform === 'darwin',
            transparent: true,
            title: 'Squid',
            titleBarStyle: 'hiddenInset',
            icon: path.resolve('src/app/ui/assets/logo.png'),
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
        };

        // If we should add vibrancy to the window
        const vibrancyEnabled = options.vibrancy.enabled;

        // Add the vibrancy options to the params object
        // if vibrancy is enabled
        if(vibrancyEnabled)
            Object.assign(params, options.vibrancy);

        // If vibrancy is enabled, return BrowserWindow
        // from electron-acrylic-window, else return
        // electron's BrowserWindow
        return (vibrancyEnabled ? new BrowserWindow(params) : new EBrowserWindow(params));
    }

    /**
     * Load the index.html file
     *
     * @return void
      */
    private loadUrl(): void {

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
     * Get the BrowserWindow instance
     *
     * @return BrowserWindow
     */
    public getWindow(): BrowserWindow {

        return this.window;
    }

    /**
     * Open the dev tools
     *
     * @return void
     */
    private openDevTools(): void {

        this.window.webContents.openDevTools({mode: 'detach'});
    }
}
