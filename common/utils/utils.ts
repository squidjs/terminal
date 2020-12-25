import electron from 'electron';
import { IConfig } from '../config/Config';

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');
export const isWin = process.platform === 'win32';

const winPathRegex = /^[A-Z]:\\.+/;
const wslBasePath = '/mnt/';

/**
 * Resolve a windows path to a wsl compatible path, only if
 * the current shell is wsl.
 *
 * @param config - The config to use
 * @param path - The path to resolve
 */
export function resolveToWSLPath(config: IConfig, path: string): string {

	if(!config.shell.includes('wsl.exe'))
		return path;

	if(!winPathRegex.test(path))
		return path;

	const drive = path.charAt(0).toLowerCase();
	const wslPath = path.slice(2).replace(/\\/g, '/');

	return wslBasePath + drive + wslPath;
}
