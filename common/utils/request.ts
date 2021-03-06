import Config from '@common/config/Config';
import { isDev } from '@common/utils/utils';

const { cloudUrl } = Config.getInstance().loadConfig();

export const baseUrl = isDev ?
    'http://localhost:3333' :
    cloudUrl;

export type MethodType = 'GET' | 'POST';

/**
 * Make a request to the cloud API at the given url and with the given
 * http method. We can also give an object to use as the body of the
 * request.
 *
 * @param url - The url to request on
 * @param method - The method to use
 * @param body - Optional body to use
 * @returns A promise of the json response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeRequest = async(url: string, method: MethodType, body?: any): Promise<any> => {

    const response = await fetch(`${baseUrl}/${url}`, {

        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}

/**
 * Make a request to the cloud API at the given url and with the given
 * http method, with a auth token? We can also give an object to use as
 * the body of the request.
 *
 * @param url - The url to request on
 * @param method - The method to use
 * @param token - The auth token to use
 * @param body - Optional body to use
 * @returns A promise of the json response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeAuthRequest = async(url: string, method: MethodType, token: string, body?: any): Promise<any> => {

    const response = await fetch(`${baseUrl}/${url}`, {

        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}
