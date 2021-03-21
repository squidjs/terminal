import { lazyload, lazyLoadAction } from '@common/utils/lazyload';
import type chalk from 'chalk';

describe('Lazy load module', () => {

    const path = require.resolve('chalk');
    const isLoaded = (): boolean => {

        return Object.keys(require.cache).includes(path);
    }

    beforeEach(() => {

        jest.resetModules();
    });

    it('should not load module if not called', () => {

        lazyload<typeof chalk>('chalk');

        expect(isLoaded()).toEqual(false);
    });

    it('should load module when called', () => {

        const lazyChalk = lazyload<typeof chalk>('chalk');
        lazyChalk();

        expect(isLoaded()).toEqual(true);
    });
});

describe('Lazy load action', () => {

    it('should not execute action if not called', () => {

        const action = jest.fn().mockReturnValueOnce('Hello');

        lazyLoadAction<string>(action);

        expect(action).not.toHaveBeenCalled();
    });

    it('should execute action when called', () => {

        const expected = 'Hello';
        const action = jest.fn().mockReturnValueOnce(expected);

        const lazyAction = lazyLoadAction<string>(action);
        const result = lazyAction();

        expect(action).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);
    });

    it('should only call action once', () => {

        const expected = 'Hello';
        const action = jest.fn().mockReturnValueOnce(expected);

        const lazyAction = lazyLoadAction<string>(action);
        const result = lazyAction();

        expect(action).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expected);

        lazyAction();

        expect(action).toHaveBeenCalledTimes(1);
    });
});

