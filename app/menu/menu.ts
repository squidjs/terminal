import { IShortcut, IShortcutActions } from '@common/config/shortcuts';
import { MenuItemConstructorOptions, remote } from 'electron';
import { IConfig } from 'common/config/Config';
import { defaultConfig } from '@common/config/defaultConfig';
const { Menu } = remote;

/**
 * Build the app menu with the given shortcuts from the config.
 *
 * @param config - The config to use
 * @param executeShortcut - A callback called when a shortcut is executed
 * @returns The built menu
 */
// eslint-disable-next-line
export const buildMenu = (config: IConfig, executeShortcut: (shortcut: IShortcut) => void): any => {

    const template: Array<MenuItemConstructorOptions> = [
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { label: 'Zoom In', ...getShortcut(config, executeShortcut, 'terminal:zoomin') },
                { label: 'Zoom Out', ...getShortcut(config, executeShortcut, 'terminal:zoomout') },
                { type: 'separator' },
                { label: 'Focus left terminal', ...getShortcut(config, executeShortcut, 'terminal:left') },
                { label: 'Focus right terminal', ...getShortcut(config, executeShortcut, 'terminal:right') }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Copy', accelerator: 'CmdOrCtrl+C', click: () => executeShortcut({ action:  'default:copy', keybinds: '' }) },
                { label: 'Paste', accelerator: 'CmdOrCtrl+V', click: () => executeShortcut({ action:  'default:paste', keybinds: '' }) },
            ]
        },
        {
            label: 'Window',
            submenu: [
                { label: 'New terminal', ...getShortcut(config, executeShortcut, 'terminal:create') },
                { label: 'Close terminal', ...getShortcut(config, executeShortcut, 'terminal:close') },
            ]
        },
    ];

    return Menu.buildFromTemplate(template);
}


/**
 * Get the shortcut properties for the given shortcut action.
 *
 * @param config - The config to use
 * @param executeShortcut - A callback called when a shortcut is executed
 * @param shortcutAction - The action of the shortcut to get
 * @returns An object containing the accelerator and the onClick callback
 */
const getShortcut = (config: IConfig, executeShortcut: (shortcut: IShortcut) => void, shortcutAction: IShortcutActions): { accelerator: string, click: () => void } => {

    let shortcut = config.shortcuts.find((current) => current.action === shortcutAction);

    if(!shortcut)
        // eslint-disable-next-line
        shortcut = defaultConfig.shortcuts.find((current) => current.action === shortcutAction) as IShortcut;

    // eslint-disable-next-line
    return { accelerator: shortcut.keybinds, click: () => executeShortcut(shortcut as IShortcut) };
}

