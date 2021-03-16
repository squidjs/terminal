import Integration from '@src/integrations/Integration';
import { isWin } from '@common/utils/utils';

// TODO with windows native registry
export default class WindowsIntegration extends Integration {

    /**
     * Check if we can install this integration on this system.
     * We can only install it if we are on windows.
     *
     * @returns If we can install this integration
     */
    public canInstall(): boolean {

        return isWin;
    }

    /**
     * Check if the integration is installed, return true in this
     * case and false else.
     *
     * @returns A promise of if the integration is installed
     */
    public async isInstalled(): Promise<boolean> {

        return new Promise<boolean>((resolve) => {

            resolve(true);
        });
    }

    /**
     * Install the integration.
     *
     * @returns A promise when the installation has completed
     */
    public async install(): Promise<void> {

        return;
    }

    /**
     * Uninstall the integration.
     *
     * @returns A promise when the uninstallation has completed
     */
    public async uninstall(): Promise<void> {

        return;
    }
}
