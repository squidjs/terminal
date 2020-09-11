import { IShortcut, IShortcutType } from '@/options/options';
import { Menu, MenuItem, ipcMain, BrowserWindow } from 'electron';

export default class ContextMenu {

    private shortcuts: IShortcut[];
    private window: BrowserWindow;
    private menu: Menu;

    constructor(shortcuts: IShortcut[], window: BrowserWindow) {

        this.shortcuts = shortcuts;
        this.window = window;
        this.menu = this.buildMenu();

        ipcMain.on('contextmenu', () => this.openMenu());
    }

    /**
     * Build the menu
     *
     * @returns Menu
     */
    buildMenu(): Menu {

        const menu = new Menu();

        menu.append(new MenuItem({ label: 'Paste', click: () => this.paste() }));
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({ label: 'New tab', accelerator: this.findShortcut('pane:open'), click: () => this.newTab() }));
        menu.append(new MenuItem({ label: 'Close tab', accelerator: this.findShortcut('pane:close'), click: () => this.closeTab() }));
        menu.append(new MenuItem({ label: 'Switch tab', accelerator: this.findShortcut('pane:switch'), click: () => this.switchTab() }));
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({ label: 'Open DevTools', accelerator: 'Ctrl+Shift+I', click: () => this.openDevTools() }));

        Menu.setApplicationMenu(menu);

        return menu;
    }

    /**
     * Find a shortcut thanks to a IShortcutType
     *
     * @param type - The type of the shortcut to find
     * @returns string
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
     * Open the menu
     *
     * @returns void
     */
    private openMenu(): void {

        this.menu.popup();
    }

    /**
     * Paste to the terminal
     *
     * @returns void
     */
    private paste(): void {

        this.window.webContents.send('shortcuts', 'paste');
    }

    /**
     * Open a new tab
     *
     * @returns void
     */
    private newTab(): void {

        this.sendToWebContents('pane:open');
    }

    /**
     * Close the current tab
     *
     * @returns void
     */
    private closeTab(): void {

        this.sendToWebContents('pane:close');
    }

    /**
     * Switch to the next tab
     *
     * @returns void
     */
    private switchTab(): void {

        this.sendToWebContents('pane:switch');
    }

    /**
     * Open the DevTools
     *
     * @returns void
     */
    private openDevTools(): void {

        this.window.webContents.send('shortcuts', 'devtools');
    }

    /**
     * Send the query to process a shortcut
     *
     * @param type - The shortcut type to send
     * @returns void
     */
    private sendToWebContents(type: IShortcutType): void {

        this.window.webContents.send('shortcuts', type);
    }
}
