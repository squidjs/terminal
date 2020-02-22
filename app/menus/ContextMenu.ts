import { IShortcut, IShortcutType } from '../settings/Settings';
import { Menu, MenuItem, ipcMain } from 'electron';
import Window from '../components/Window';

export default class ContextMenu {

    private shortcuts: IShortcut[];
    private window: Window;
    private menu: Menu;

    constructor(shortcuts: IShortcut[], window: Window) {

        this.shortcuts = shortcuts;
        this.window = window;
        this.menu = this.buildMenu();

        ipcMain.on('contextmenu', () => this.openMenu());
    }

    /**
     * Build the menu
     * @return The menu
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
     * @param type
     * @return a string of the keys
     */
    findShortcut(type: IShortcutType): string {

        let shortcut = null;

        this.shortcuts.forEach(current => {

            if(current.action == type)
                shortcut = current.keys;
        });

        return shortcut;
    }

    /**
     * Open the menu
     */
    openMenu() {

        this.menu.popup();
    }

    /**
     * Paste to the terminal
     */
    paste() {

        this.window.getWindow().webContents.send('shortcuts', 'paste');
    }

    /**
     * Open a new tab
     */
    newTab() {

        this.sendToWebContents('pane:open');
    }

    /**
     * Close the current tab
     */
    closeTab() {

        this.sendToWebContents('pane:close');
    }

    /**
     * Switch to the next tab
     */
    switchTab() {

        this.sendToWebContents('pane:switch');
    }

    /**
     * Open the DevTools
     */
    openDevTools() {

        this.window.openDevTools();
    }

    /**
     * Send the query to process a shortcut
     * @param action
     */
    sendToWebContents(action: IShortcutType) {

        this.window.getWindow().webContents.send('shortcuts', action);
    }
}
