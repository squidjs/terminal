import * as keytar from 'keytar';
import { UndefinedObject } from '@common/types/types';

const SERVICE_NAME = 'squid';
type AccountType = 'apiToken' | 'encryptToken';

export default class Vault {

    // Create a singleton instance of this object
    private static instance: Vault = new Vault();
    private data: UndefinedObject<IVaultData>;

    /**
     * Load the IVaultData stored in the system keychain.
     *
     * @return A promise of the data
     */
    public async load(): Promise<UndefinedObject<IVaultData>> {

        if(this.data)
            return this.data;

        // Get both promises and execute them
        const apiPwd = this.getPassword('apiToken');
        const encryptPwd = this.getPassword('encryptToken');

        let [apiToken, encryptToken] = await Promise.all([apiPwd, encryptPwd]);

        this.data = {

            apiToken,
            encryptToken,
        };

        return this.data;
    }

    /**
     * Set a password in the system keychain.
     *
     * @param account - The account to set the password on
     * @param password - The password to save
     */
    public setPassword(account: AccountType, password: string) {

        keytar.setPassword(SERVICE_NAME, account, password);

        // Update the local data cache
        if(account === 'apiToken')
            this.data = { ...this.data, apiToken: password } as IVaultData;
        else  if(account === 'encryptToken')
            this.data = { ...this.data, encryptToken: password } as IVaultData;
    }

    /**
     * Get the password for the given account type.
     *
     * @param account - The type of the account
     * @returns A promise of the password in string
     */
    private async getPassword(account: AccountType): Promise<string> {

        const password = await keytar.getPassword(SERVICE_NAME, account);

        return password || '';
    }

    /**
     * Get the cached vault data.
     *
     * @returns The vault data or undefined if not set
     */
    public getData(): UndefinedObject<IVaultData> {

        return this.data;
    }

    /**
     * Get the singleton instance of this Vault object.
     *
     * @returns The Vault instance
     */
    public static getInstance(): Vault {

        return Vault.instance;
    }
}

export interface IVaultData {
    /**
     * The api token to use to make http requests to the cloud.
     */
    apiToken: string;
    /**
     * The token used to encrypt and decrypt data.
     */
    encryptToken: string;
}
