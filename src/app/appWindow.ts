import { BrowserWindow } from 'electron';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

export default class AppWindow {

    // The instance of the BrowserWindow
    private readonly window: BrowserWindow;

    constructor() {

        // Buil the window
        this.window = this.buildWindow();

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
    private buildWindow(): BrowserWindow {

        return new BrowserWindow({

            width: 1200,
            height: 800,
            minWidth: 600,
            minHeight: 500,
            frame: false,
            transparent: true,
            title: 'Squid',
            icon: path.resolve('src/app/ui/assets/logo.png'),
            show: false,
            //backgroundColor: '#0F0F0F',
            webPreferences: {
                nodeIntegration: true
            }
        });
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
