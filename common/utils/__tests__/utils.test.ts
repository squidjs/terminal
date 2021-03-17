import { IWindow } from '@app/Terminal';
import { addQuotes, resolveToWSLPath } from '@common/utils/utils';

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
});
