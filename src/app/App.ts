import { UndefinedObject } from '@common/types/types';
import WindowFactory from '@src/window/WindowFactory';
import { app, protocol } from 'electron';
import Updater from '@src/updater/Updater';
import MacIntegration from '@src/integrations/MacIntegration';
import WindowsIntegration from '@src/integrations/WindowsIntegration';

export default class App {

    private window: UndefinedObject<WindowFactory>;

    constructor() {

        // Instanciate the "Open here" integrations
        new MacIntegration();
        new WindowsIntegration();

        app.allowRendererProcessReuse = false;

        this.listenAppEvents();
    }

    /**
     * Create the factory for the window of this app, and
     * start the auto updater when the window is ready to
     * be shown.
     *
     * @see WindowFactory
     */
    private createWindow() {

        this.window = new WindowFactory();

        this.window.getFactoryObject().on('ready-to-show', () => {

            new Updater();
        });
    }

    /**
     * Listen for general app events to create the window,
     * quit the app...
     */
    private listenAppEvents() {

        app.on('window-all-closed', () => app.quit());

        app.on('activate', () => {

            if(this.window?.getFactoryObject() === null)
                this.createWindow();
        });

        app.on('ready', () => {

            protocol.registerFileProtocol('squid', (request, callback) => {

                const url = request.url.substr(8);
                callback({ path: url });
            });

            this.createWindow()
        });
    }
}
