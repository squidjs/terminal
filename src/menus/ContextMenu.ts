import { IShortcut, IShortcutType } from '@/options/options';
import { Menu, MenuItem, ipcMain, BrowserWindow, globalShortcut, app } from 'electron';

export default class ContextMenu {

    private shortcuts: IShortcut[];
    private window: BrowserWindow;
    private menu: Menu;

    constructor(shortcuts: IShortcut[], window: BrowserWindow) {

        this.shortcuts = shortcuts;
        this.window = window;
        this.menu = this.buildMenu();

        app.on('browser-window-focus', () => {

             this.registerGlobalShortcuts();
        });

        app.on('browser-window-blur', () => {

            globalShortcut.unregisterAll();
        });

        ipcMain.on('contextmenu', () => this.openMenu());
    }

    private registerGlobalShortcuts() {

        globalShortcut.register(this.findShortcut('pane:open'), () => this.newTab());
        globalShortcut.register(this.findShortcut('pane:close'), () => this.closeTab());
        globalShortcut.register(this.findShortcut('pane:switchLeft'), () => this.switchLeft());
        globalShortcut.register(this.findShortcut('pane:switchRight'), () => this.switchRight());
    }

    /**
     * Build the menu.
     *
     * @returns The Menu instance
     */
    buildMenu(): Menu {

        const menu = new Menu();

        menu.append(new MenuItem({ label: 'Paste', click: () => this.paste() }));
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({ label: 'New tab', click: () => this.newTab() }));
        menu.append(new MenuItem({ label: 'Close tab', click: () => this.closeTab() }));
        menu.append(new MenuItem({ label: 'Go to left tab', click: () => this.switchLeft() }));
        menu.append(new MenuItem({ label: 'Go to right tab', click: () => this.switchRight() }));
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({ label: 'Open DevTools', accelerator: 'Ctrl+Shift+I', click: () => this.openDevTools() }));

        Menu.setApplicationMenu(menu);

        return menu;
    }

    /**
     * Find a shortcut thanks to a IShortcutType.
     *
     * @param type - The type of the shortcut to find
     * @returns The shortcut
     */
    findShortcut(type: IShortcutType): string {

        let shortcut: string;

        this.shortcuts.forEach(current => {

            if(current.action == type)
                shortcut = current.keys;
        });

        // @ts-ignore
        return shortcut;
    }

    /**
     * Open the menu.
     */
    private openMenu() {

        this.menu.popup();
    }

    /**
     * Paste to the terminal.
     */
    private paste() {

        this.window.webContents.send('shortcuts', 'paste');
    }

    /**
     * Open a new tab.
     */
    private newTab() {

        this.sendToWebContents('pane:open');
    }

    /**
     * Close the current tab.
     */
    private closeTab() {

        this.sendToWebContents('pane:close', 'current');
    }

    /**
     * Switch to the left tab.
     */
    private switchLeft() {

        this.sendToWebContents('pane:switchLeft');
    }

    /**
     * Switch to the right tab.
     */
    private switchRight() {

        this.sendToWebContents('pane:switchRight');
    }

    /**
     * Open the DevTools.
     */
    private openDevTools() {

        this.window.webContents.send('shortcuts', 'devtools');
    }

    /**
     * Send the query to process a shortcut.
     *
     * @param type - The shortcut type to send
     * @param object - A optional parameter
     */
    private sendToWebContents(type: IShortcutType, object?: any) {

        this.window.webContents.send('shortcuts', type, object);
    }
}
