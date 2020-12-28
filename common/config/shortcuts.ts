export interface IShortcut {
	/**
	 * The name of this shortcut.
	 */
	name: string;
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
export type TerminalShortcuts = 'terminal:create' | 'terminal:close' | 'terminal:zoomin' | 'terminal:zoomout';

/**
 * Window shortcuts.
 */
type WindowShortcuts = 'window:devtools' | 'window:reload';

/**
 * All available shortcut actions.
 */
export type IShortcutActions = TerminalShortcuts | WindowShortcuts;
