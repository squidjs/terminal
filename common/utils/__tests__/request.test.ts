import { baseUrl, makeAuthRequest, makeRequest, MethodType } from '@common/utils/request';

describe('Make a request', () => {

    const getCallParams = (method: MethodType, body?: any) => {

        return expect.objectContaining({
            method,
            body: body ? JSON.stringify(body) : body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    };

    it('should make a request without body', async() => {

        const url = 'test';
        const method: MethodType = 'GET';

        const expected = { success: true };
        const expectedUrl = `${baseUrl}/${url}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async() => expected,
        });

        const resultRequest = await makeRequest(url, method);

        expect(global.fetch).toHaveBeenCalledWith(
            expectedUrl,
            getCallParams(method),
        );
        expect(resultRequest).toEqual(expected);
    });

    it('should make a request with body', async() => {

        const url = 'test';
        const method: MethodType = 'POST';
        const body = { hello: 'world' };

        const expected = { success: true };
        const expectedUrl = `${baseUrl}/${url}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async() => expected,
        });

        const resultRequest = await makeRequest(url, method, body);

        expect(global.fetch).toHaveBeenCalledWith(
            expectedUrl,
            getCallParams(method, body),
        );
        expect(resultRequest).toEqual(expected);
    });
});

describe('Make an auth request', () => {

    const fakeToken = 'faketoken';

    const getCallParams = (method: MethodType, body?: any) => {

        return expect.objectContaining({
            method,
            body: body ? JSON.stringify(body) : body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fakeToken}`,
            },
        });
    };

    it('should make an auth request without body', async() => {

        const url = 'test';
        const method: MethodType = 'GET';

        const expected = { success: true };
        const expectedUrl = `${baseUrl}/${url}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async() => expected,
        });

        const resultRequest = await makeAuthRequest(url, method, fakeToken);

        expect(global.fetch).toHaveBeenCalledWith(
            expectedUrl,
            getCallParams(method),
        );
        expect(resultRequest).toEqual(expected);
    });

    it('should make an auth request with body', async() => {

        const url = 'test';
        const method: MethodType = 'POST';
        const body = { hello: 'world' };

        const expected = { success: true };
        const expectedUrl = `${baseUrl}/${url}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async() => expected,
        });

        const resultRequest = await makeAuthRequest(url, method, fakeToken, body);

        expect(global.fetch).toHaveBeenCalledWith(
            expectedUrl,
            getCallParams(method, body),
        );
        expect(resultRequest).toEqual(expected);
    });
});

