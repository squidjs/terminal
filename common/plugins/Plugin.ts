import { BrowserWindowConstructorOptions } from 'electron';
import { IConfig } from '@common/config/Config';
import { isMainProcess } from '@common/utils/utils';

export type Process = 'main' | 'renderer';

export type ProcessHookParam<P> = {

    param: P;
    process: Process;
}

export type HookParams =
    BrowserWindowConstructorOptions |
    ProcessHookParam<IConfig>;

export const processHook = <P>(param: P): ProcessHookParam<P> => ({

    param,
    process: isMainProcess ? 'main' : 'renderer',
});

export interface Plugin {

    onAppLoaded?: () => void;
    onAppClosed?: () => void;
    onWindowShow?: () => void;

    hookWindowOptions?: (options: BrowserWindowConstructorOptions) => BrowserWindowConstructorOptions;
    hookConfig?: (options: ProcessHookParam<IConfig>) => ProcessHookParam<IConfig>;
}
