export default abstract class Integration {

    constructor() {

        if(this.canInstall())
            this.checkInstall();
    }

    /**
     * Check if we should install the integration.
     *
     * @returns A promise when the check has finished
     */
    private async checkInstall(): Promise<void> {

        const installed = await this.isInstalled();

        if(!installed)
            await this.install();
    }

    /**
     * Check if we can install this integration on this system.
     *
     * @returns If we can install this integration
     */
    public abstract canInstall(): boolean;

    /**
     * Check if the integration is installed, return true in this
     * case and false else.
     *
     * @returns A promise of if the integration is installed
     */
    public abstract isInstalled(): Promise<boolean>;

    /**
     * Install the integration.
     *
     * @returns A promise when the installation has completed
     */
    public abstract install(): Promise<void>;

    /**
     * Uninstall the integration.
     *
     * @returns A promise when the uninstallation has completed
     */
    public abstract uninstall(): Promise<void>;
}
