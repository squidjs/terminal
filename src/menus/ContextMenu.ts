import { IShortcut, IShortcutType } from '@/options/options';
import { Menu, MenuItem, ipcMain, BrowserWindow } from 'electron';;

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
     * @return Menu
     */
    buildMenu(): Menu {

        const menu = new Menu();

        menu.append(new MenuItem({ label: 'Paste', click: () => this.paste()}));
        menu.append(new MenuItem({ type: 'separator'}));
        menu.append(new MenuItem({ label: 'New tab', accelerator: this.findShortcut('pane:open'), click: () => this.newTab()}));
        menu.append(new MenuItem({ label: 'Close tab', accelerator: this.findShortcut('pane:close'), click: () => this.closeTab()}));
        menu.append(new MenuItem({ label: 'Switch tab', accelerator: this.findShortcut('pane:switch'), click: () => this.switchTab()}));
        menu.append(new MenuItem({ type: 'separator'}));
        menu.append(new MenuItem({ label: 'Open DevTools', accelerator: 'Ctrl+Shift+I', click: () => this.openDevTools()}));

        Menu.setApplicationMenu(menu);

        return menu;
    }

    /**
     * Find a shortcut thanks to a IShortcutType
     *
     * @param IShortcutType
     * @return string
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
     * @return void
     */
    private openMenu(): void {

        this.menu.popup();
    }

    /**
     * Paste to the terminal
     *
     * @return void
     */
    private paste(): void {

        this.window.webContents.send('shortcuts', 'paste');
    }

    /**
     * Open a new tab
     *
     * @return void
     */
    private newTab(): void {

        this.sendToWebContents('pane:open');
    }

    /**
     * Close the current tab
     *
     * @return void
     */
    private closeTab(): void {

        this.sendToWebContents('pane:close');
    }

    /**
     * Switch to the next tab
     *
     * @return void
     */
    private switchTab(): void {

        this.sendToWebContents('pane:switch');
    }

    /**
     * Open the DevTools
     *
     * @return void
     */
    private openDevTools(): void {

        this.window.webContents.send('shortcuts', 'devtools');
    }

    /**
     * Send the query to process a shortcut
     *
     * @param IShortcutType
     * @return void
     */
    private sendToWebContents(action: IShortcutType): void {

        this.window.webContents.send('shortcuts', action);
    }
}
