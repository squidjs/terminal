// TODO dynamic between dev and prod
const baseUrl = 'http://localhost:3333';

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
export const makeRequest = async(url: string, method: MethodType, body?: Record<string, string>): Promise<any> => {

    // We only make json requests and responses
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const response = await fetch(`${baseUrl}/${url}`, {

        method,
        headers,
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
export const makeAuthRequest = async(url: string, method: MethodType, token: string, body?: any): Promise<any> => {

    // We only make json requests and responses
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const response = await fetch(`${baseUrl}/${url}`, {

        method,
        headers,
        body: JSON.stringify(body),
    });

    return await response.json();
}
