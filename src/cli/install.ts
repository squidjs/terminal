import { isDev, isMac, isWin } from '@common/utils/utils';
import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';
import sudo from 'sudo-prompt';

const BIN_NAME = isMac ?
    'squid-mac' : isWin ?
    'squid-windows' :
    'squid-linux';

// TODO other OS paths
const ICON = isMac ?
    '/Applications/Squid.app/Contents/Resources/Squid.icns' : isWin ?
    '' :
    '';

const SCRIPT_PATH = isDev ?
    path.resolve(
        'resources',
        'bin',
        BIN_NAME) :
    path.join(
        app.getPath('exe'),
        '..',
        '..',
        'Resources',
        'bin',
        BIN_NAME);

// TODO windows path
const INSTALL_PATH = isWin ?
    '' :
    '/usr/local/bin/squid'

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

            if(err) {

                sudo.exec(`ln -s ${SCRIPT_PATH} ${INSTALL_PATH}`, {
                    name: 'Squid',
                    icns: ICON,
                }, () => resolve());
            }

            resolve();
        });
    });
}

/**
 * Try to install the CLI if not installed.
 */
export const tryInstallCli = async() => {

    const installed = await isInstalled();

    // TODO upgrade
    if(!installed)
        await install();
}
