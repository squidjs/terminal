import { IWindow } from '@app/Terminal';
import { addQuotes, hash, isBlank, resolveToWSLPath } from '@common/utils/utils';
import * as crypto from 'crypto';

describe('Resolve WSL paths', () => {

    it('should resolve path if shell is wsl', () => {

        const window: IWindow = {

            id: 0,
            name: '',
            selected: true,
            terminalType: {
                name: '',
                path: 'wsl.exe',
            },
        };

        const path = 'C:\\Users\\tom';
        const expected = '/mnt/c/Users/tom';

        expect(resolveToWSLPath(window, path)).toEqual(expected);
    });

    it('should not resolve path if shell is not wsl', () => {

        const window: IWindow = {

            id: 0,
            name: '',
            selected: true,
            terminalType: {
                name: '',
                path: '/bin/zsh',
            },
        };

        const path = '/var/www/html';
        const expected = '/var/www/html';

        expect(resolveToWSLPath(window, path)).toEqual(expected);
    });

    it('should not resolve path if window is ssh', () => {

        const window: IWindow = {

            id: 0,
            name: '',
            selected: true,
            terminalType: {
                name: '',
                host: '',
                port: 0,
                username: '',
            },
        };

        const path = '/var/www/html';
        const expected = '/var/www/html';

        expect(resolveToWSLPath(window, path)).toEqual(expected);
    });
});

describe('Add quotes', () => {

    it('should add quotes to string containing multiple paths', () => {

        const paths = '/var/www/html /var/log';
        const expected = '"/var/www/html /var/log"';

        expect(addQuotes(paths)).toEqual(expected);
    });

    it('should not add quotes to string with only one path', () => {

        const paths = '/var/log';
        const expected = '/var/log';

        expect(addQuotes(paths)).toEqual(expected);
    });

    it('should throw error with empty path', () => {

        expect(() => addQuotes('')).toThrowError(new Error('Path can not be empty'));
        expect(() => addQuotes('  ')).toThrowError(new Error('Path can not be empty'));
    });
});

describe('Hash password', () => {

    it('should hash password', async() => {

        const password = 'hello';
        const expected = 'helloencryptedhelloencryptedhelloencryptedhelloencrypted'.substr(0, 32);

        const hashMock = {
            update: jest.fn().mockReturnThis(),
            digest: jest.fn().mockReturnValueOnce(expected),
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const createHashMock = jest.spyOn(crypto, 'createHash').mockImplementationOnce(() => hashMock);
        const resultHash = await hash(password);

        expect(createHashMock).toBeCalledWith('sha256');
        expect(hashMock.update).toBeCalledWith(password);
        expect(hashMock.digest).toBeCalledWith('base64');
        expect(resultHash).toEqual(expected);

        createHashMock.mockRestore();
    });

    it('should throw error with empty password', async() => {

        const createHashMock = jest.spyOn(crypto, 'createHash');

        expect(hash('')).rejects.toEqual(new Error('Password can not be empty'));
        expect(hash(' ')).rejects.toEqual(new Error('Password can not be empty'));
        expect(createHashMock).not.toBeCalled();

        createHashMock.mockRestore();
    });
})

describe('String is blank', () => {

    it('should return false if string is not empty', () => {

        expect(isBlank('test')).toEqual(false);
    });

    it('should return false if string is not empty and has white space', () => {

        expect(isBlank(' test ')).toEqual(false);
    });

    it('should return true if string is empty', () => {

        expect(isBlank('')).toEqual(true);
    });

    it('should return true if string only has whitespace', () => {

        expect(isBlank('  ')).toEqual(true);
    });
});
