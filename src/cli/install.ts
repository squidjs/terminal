import { isDev, isMac, isWin } from '@common/utils/utils';
import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

const BIN_NAME = isMac ? 'squid-mac' : isWin ? 'squid-windows' : 'squid-linux';

const SCRIPT_PATH = isDev ?
    path.resolve(
        'resources',
        'bin',
        BIN_NAME) :
    path.join(
        app.getPath('exe'),
        'Contents',
        'Resources',
        'bin',
        'squid');
// TODO windows path
const INSTALL_PATH = isWin ? '' : '/usr/local/bin/squid'

/**
 * Check if the CLI is installed at INSTALL_PATH.
 *
 * @returns A promise of true if installed, false else
 */
const isInstalled = async(): Promise<boolean> => {

    return new Promise<boolean>((resolve) => {

        fs.readlink(INSTALL_PATH, (err, link) => {

            if(err)
                resolve(false);

            resolve(link === SCRIPT_PATH);
        });
    });
}

/**
 * Install the CLI.
 */
const install = async() => {

    return new Promise<void>((resolve) => {

        fs.symlink(SCRIPT_PATH, INSTALL_PATH, (err) => {

            // TODO check if no perm
            console.log(err);
            resolve();
        });
    });
}

/**
 * Try to install the CLI if not installed.
 */
export const tryInstallCli = async() => {

    const installed = await isInstalled();

    if(!installed)
        await install();
}
