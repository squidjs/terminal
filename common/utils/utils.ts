import electron from 'electron';
import { ITerminal } from '../../app/Terminal';
import { IShell } from '../config/Config';

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
export const isWin = process.platform === 'win32';
export const isMac = process.platform === 'darwin';

const winPathRegex = /^[A-Z]:\\.+/;
const wslBasePath = '/mnt/';

/**
 * Resolve a windows path to a wsl compatible path, only if
 * the current shell is wsl.
 *
 * @param terminal - The ITerminal object
 * @param path - The path to resolve
 * @returns The path which work with wsl
 */
export function resolveToWSLPath(terminal: ITerminal, path: string): string {

	if(Object.prototype.hasOwnProperty.call(terminal.terminalType, 'path') && !(terminal.terminalType as IShell).path.includes('wsl.exe'))
		return path;

	if(!winPathRegex.test(path))
		return path;

	const drive = path.charAt(0).toLowerCase();
	const wslPath = path.slice(2).replace(/\\/g, '/');

	return wslBasePath + drive + wslPath;
}

/**
 * Add quotes to a path if there are spaces in it.
 *
 * @param path - The path to add quotes to
 * @returns The quoted path
 */
export function addQuotes(path: string): string {

	if(!path.includes(' '))
		return path;

	return `"${path}"`;
}

/**
 * Find the next terminal id to use.
 *
 * @param terminals - The list of current terminals
 */
export function nextTerminalId(terminals: ITerminal[]): number {

	let id = 0;

	while(terminals.find((current) => current.id === id))
		id++;

	return id;
}
