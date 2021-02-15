import { UndefinedObject } from '@common/types/types';
import WindowFactory from '@src/window/WindowFactory';
import NativeContextMenu from '@src/window/NativeContextMenu';
import { app } from 'electron';
import Updater from '@src/updater/Updater';

export default class App {

    private readonly isDev: boolean;
    private window: UndefinedObject<WindowFactory>;
    private nativeContextMenu: NativeContextMenu;

    constructor(args: string[], isDev: boolean) {

        this.isDev = isDev;
        this.nativeContextMenu = new NativeContextMenu();
        this.nativeContextMenu.check(args);
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

        this.window = new WindowFactory(this.isDev);

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

        app.on('ready', () => this.createWindow());
    }
}
