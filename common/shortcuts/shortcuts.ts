export interface IShortcut {
    /**
     * The keybindings to execute this shortcut.
     */
    keybinds: string;
    /**
     * The action to execute
     */
    action: IShortcutActions;
}

/**
 * Terminal shortcuts.
 */
export type TerminalShortcuts = 'terminal:create' | 'terminal:close' | 'terminal:zoomin' | 'terminal:zoomout' | 'terminal:left' | 'terminal:right';

/**
 * Default shortcuts.
 */
export type DefaultShortcuts = 'default:copy' | 'default:paste';

/**
 * All available shortcut actions.
 */
export type IShortcutActions = TerminalShortcuts | DefaultShortcuts;
