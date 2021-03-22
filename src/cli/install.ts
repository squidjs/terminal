import { isMac, isWin } from '@common/utils/utils';
import * as fs from 'fs';
import sudo from 'sudo-prompt';
import * as electron from 'electron';
import { INotification, INotificationLevel } from '@app/notifications/notification';

const BIN_NAME = isMac ?
    'squid-mac' : isWin ?
    'squid-windows' :
    'squid-linux';

// TODO other OS paths
const ICON = isMac ?
    '/Applications/Squid.app/Contents/Resources/Squid.icns' : isWin ?
    '' :
    '';

const SCRIPT_PATH = isMac ?
    `/Applications/Squid.app/Contents/Resources/bin/${BIN_NAME}` : isWin ?
    '' :
    '';

// TODO windows path
const INSTALL_PATH = isWin ?
    '' :
    '/usr/local/bin/squid'

/**
 * Check if the CLI is installed at INSTALL_PATH.
 *
 * @returns If the CLI is installed.
 */
export const isCLIInstalled = (): boolean => {

    try {

        const link = fs.readlinkSync(INSTALL_PATH);

        return link === SCRIPT_PATH;

    } catch (err) {

        return false;
    }
}

/**
 * Install the CLI.
 *
 * @param allowSudo - If we allow installing with sudo
 */
export const installCLI = async(allowSudo = false) => {

    return new Promise<void>((resolve) => {

        if(isWin) {
            // TODO windows install
        } else {

            fs.symlink(SCRIPT_PATH, INSTALL_PATH, async(err) => {

                if(err && err.code === 'EACCES' && allowSudo)
                    await sudoInstall();

                sendNotification(true);
                resolve();
            });
        }
    });
}

/**
 * Uninstall the CLI.
 *
 * @param allowSudo - If we allow uninstalling with sudo
 */
export const uninstallCLI = async(allowSudo = false) => {

    return new Promise<void>((resolve) => {

        if(isWin) {
            // TODO windows install
        } else {

            fs.unlink(INSTALL_PATH, async(err) => {

                if(err && err.code === 'EACCES' && allowSudo)
                    await sudoUninstall();

                sendNotification(false);
                resolve();
            });
        }
    });
}

/**
 * Install the CLI with sudo.
 */
const sudoInstall = async() => {

    return new Promise<void>((resolve) => {

        sudo.exec(`ln -s ${SCRIPT_PATH} ${INSTALL_PATH}`, {
            name: 'Squid',
            icns: ICON,
        }, () => resolve());
    });
}

/**
 * Uninstall the CLI with sudo.
 */
const sudoUninstall = async() => {

    return new Promise<void>((resolve) => {

        sudo.exec(`rm ${INSTALL_PATH}`, {
            name: 'Squid',
            icns: ICON,
        }, () => resolve());
    });
}

/**
 * Send an installed or uninstalled success notification.
 *
 * @param installed - If we sucessfully installed or uninstalled the CLI
 */
const sendNotification = (installed: boolean) => {

    const notification: INotification = {
        title: 'CLI',
        content: `Successfully ${installed ? 'installed' : 'uninstalled'} the CLI.`,
        level: INotificationLevel.SUCCESS,
        time: 3,
    };

    (electron.BrowserWindow || electron.remote.BrowserWindow).getFocusedWindow()?.webContents.send('notification', notification);
}

/**
 * Try to install the CLI if not installed.
 */
export const tryInstallCli = async() => {

    const installed = isCLIInstalled();
    const update = false;//shouldUpdateCLI(installed);

    if(update)
        await uninstallCLI();

    if(!installed)
        await installCLI();
}
