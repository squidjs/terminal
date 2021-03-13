import electron from 'electron';
import { IWindow, TerminalType } from '@app/Terminal';
import { IShell } from '@common/config/Config';
import crypto from 'crypto';

export const userDataPath = (electron.app || electron.remote.app).getPath('userData');

export const isDev = process.env.NODE_ENV !== 'production';
export const isWin = process.platform === 'win32';
export const isMac = process.platform === 'darwin';

export const isMainProcess = (process && process.type === 'browser');

export type Process = 'main' | 'renderer';

const winPathRegex = /^[A-Z]:\\.+/;
const wslBasePath = '/mnt/';

/**
 * Resolve a windows path to a wsl compatible path, only if
 * the current shell is wsl.
 *
 * @param window - The IWindow object
 * @param path - The path to resolve
 * @returns The path which work with wsl
 */
export function resolveToWSLPath(window: IWindow, path: string): string {

    if(!isTerminalSSH(window.terminalType) && !(window.terminalType as IShell).path.includes('wsl.exe'))
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
 * Find the next windows id to use.
 *
 * @param windows - The list of current windows
 */
export function nextWindowId(windows: IWindow[]): number {

    let id = 0;

    while(windows.find((current) => current.id === id))
        id++;

    return id;
}

/**
 * Check if a terminal type is a ssh or a shell terminal.
 *
 * @param terminalType - The type of the terminal to check
 * @returns If the terminal  type is ssh or shell
 */
export function isTerminalSSH(terminalType: TerminalType): boolean {

    // To define the type of terminal we check if there
    // is a username property. If yes, we assume that
    // the terminal type is a ssh.
    return Object.prototype.hasOwnProperty.call(terminalType, 'username');
}

/**
 * Check if a window is a settings window or a terminal
 * (ssh or shell) window by checking if the terminalType
 * is null.
 *
 * @param window - The window to check
 * @returns True if window is a settings window
 */
export function isSettingsWindow(window: IWindow): boolean {

    return window.terminalType === null;
}

/**
 * Hash a password with SCrypt. We don't need to verify the hash later,
 * so we don't save the salt.
 *
 * @param password - The password to hash
 * @returns A promise of the hashed password
 */
export async function hash(password: string): Promise<string> {

    return crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
}

// The algorithm to use to create the cipher
const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

/**
 * Represent an encrypted object with a specific iv and json-encoded content.
 */
export interface IEncrypted {

    iv: string;
    content: string;
}

/**
 * Encrypt a text with the given encrypted token. We create a cipher with an
 * algorithm above, and use the encryped token to secure it.
 *
 * @param text - The text to encrypt
 * @param encryptToken - The token used to encrypt
 * @returns The IEncrypted object
 */
export function encrypt(text: string, encryptToken: string): IEncrypted {

    const cipher = crypto.createCipheriv(algorithm, encryptToken, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {

        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

/**
 * Decrypt an IEncrypted object thanks to the given encrypt token. We create a
 * cipher with an algorithm above, and use the encryped token to verify it.
 *
 * @param encrypted - The encrypted object to decrypt
 * @param encryptToken - The token used to encrypt
 * @returns The decrypted object
 */

export function decrypt(encrypted: IEncrypted, encryptToken: string): string {

    const decipher = crypto.createDecipheriv(algorithm, encryptToken, Buffer.from(encrypted.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted.content, 'hex')), decipher.final()]);

    return decrypted.toString();
}
