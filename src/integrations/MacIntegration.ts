import Integration from '@src/integrations/Integration';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { app } from 'electron';
import { isDev, isMac } from '@common/utils/utils';

const WORKFLOW_NAME = 'Open Squid here.workflow';
const RESOURCE_PATH = path.join(
    isDev ? '/Applications/Squid.app' : app.getPath('exe'),
    'Contents',
    'Resources',
    'workflows',
    WORKFLOW_NAME);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const INSTALL_PATH = path.join(process.env.HOME!, 'Library', 'Services', WORKFLOW_NAME);

export default class MacIntegration extends Integration {

    /**
     * Check if we can install this integration on this system.
     * We can only install it if we are on mac.
     *
     * @returns If we can install this integration
     */
    public canInstall(): boolean {

        return isMac;
    }

    /**
     * Check if the integration is installed, return true in this
     * case and false else.
     *
     * @returns A promise of if the integration is installed
     */
    public isInstalled(): Promise<boolean> {

        return new Promise<boolean>((resolve) => {

            fs.exists(INSTALL_PATH, (exists) => resolve(exists));
        });
    }

    /**
     * Install the integration by copying the workflow from the
     * resources directory to the install path.
     *
     * @returns A promise when the installation has completed
     */
    public async install(): Promise<void> {

        return new Promise((resolve) => {

            const childProcess = exec(`cp -r "${RESOURCE_PATH}" "${INSTALL_PATH}"`);
            childProcess.on('close', resolve)
        });
    }

    /**
     * Uninstall the integration by deleting the workflow from the
     * install path.
     *
     * @returns A promise when the uninstallation has completed
     */
    public async uninstall(): Promise<void> {

        return new Promise((resolve) => {

            const childProcess = exec(`rm -rf "${INSTALL_PATH}"`);
            childProcess.on('close', resolve)
        });
    }
}
