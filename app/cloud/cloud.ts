import Vault, { IVaultData } from '@app/cloud/Vault';
import { ISSHHost } from '@common/config/Config';
import { UndefinedObject } from '@common/types/types';
import { makeAuthRequest, makeRequest } from '@common/utils/request';
import { decrypt, encrypt, hash, IEncrypted } from '@common/utils/utils';

/**
 * Initialize the cloud by loading the tokens in the Vault
 * and checking if we should login or not. We return the list
 * of hosts if we are logged in.
 *
 * @returns A promise of if we should login and the hosts
 */
export const initializeCloud = async(): Promise<{ shouldLogin: boolean, hosts: ISSHHost[] }> => {

    const vault = Vault.getInstance();
    const vaultData = await vault.load();

    // If the data is not set or if the api/encrypt tokens are not present,
    // that means we should login
    if(!vaultData || !vaultData.apiToken || !vaultData.encryptToken)
        return { shouldLogin: true, hosts: [] };

    const hosts = await getCloudHosts(vaultData);

    return { shouldLogin: false, hosts };
}

/**
 * Login to the cloud with the given email and password. Return an error
 * if the credentials are bad, and return the list of hosts else.
 *
 * @param email - The email to use
 * @param password - The password to use
 * @returns A promise of the hosts
 */
export const login = async(email: string, password: string): Promise<ISSHHost[]> => {

    const token = await getAPIToken(email, password);

    return new Promise<ISSHHost[]>((resolve, reject) => {

        // If the token is set, we are successfully authenticated
        if(token) {

            // Hash the password to generate the encryptToken and set both the
            // generated token and the api token in the system keychain
            hash(password).then(async(encryptToken) => {

                const vault = Vault.getInstance();
                vault.setPassword('apiToken', token);
                vault.setPassword('encryptToken', encryptToken);

                resolve(await getCloudHosts(vault.getData()!));
            });

        } else
            reject('Bad credentials');
    });
}

/**
 * Logout from the cloud by removing the tokens from the system keychain.
 * You then need to update the store to logout completely.
 */
export const logout = () => {

    const vault = Vault.getInstance();
    vault.deletePassword('apiToken');
    vault.deletePassword('encryptToken');
}

/**
 * Get the API token by logging in into the cloud.
 *
 * @param email - The email to login with
 * @param password - The password to login with
 * @returns A promise of the token or undefined if not found
 */
const getAPIToken = async(email: string, password: string): Promise<UndefinedObject<string>> => {

    const json = await makeRequest('login', 'POST', {

        email,
        password,
    });

    // Return the string token or undefined
    return json?.token;
}

/**
 * Get the hosts in the cloud with the both tokens.
 *
 * @param data - The vault data
 * @returns A promise of the list of the hosts
 */
const getCloudHosts = async(data: IVaultData): Promise<ISSHHost[]> => {

    return new Promise<ISSHHost[]>((resolve) => {

        let hosts: ISSHHost[] = [];
        const { apiToken, encryptToken } = data;

        makeAuthRequest('hosts', 'GET', apiToken).then((json) => {

            json.forEach(({ iv, content }: { iv: string, content: string }) => {

                const hash: IEncrypted = {

                    iv,
                    content
                };

                const host = decryptHost(hash, encryptToken);
                hosts.push(host);
            });

            resolve(hosts);
        });
    });
}

/**
 * Encrypt a ISSHHost to a IEncrypted with the given encryptToken.
 *
 * @param host - The host to encrypt
 * @param encryptToken - The token to use to encrypt
 * @returns The encrypted host
 */
const encryptHost = (host: ISSHHost, encryptToken: string): IEncrypted => {

    return encrypt(JSON.stringify(host), encryptToken);
}

/**
 * Decrypt a IEncrypted to a ISSHHost with the given encryptToken.
 *
 * @param encrypted - The encrypted to decrypt
 * @param encryptToken - The token to use to decrypt
 * @returns The decrypted host
 */
const decryptHost = (encrypted: IEncrypted, encryptToken: string): ISSHHost => {

    return JSON.parse(decrypt(encrypted, encryptToken));
}
