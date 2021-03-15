import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';
import { IConfig } from '@common/config/Config';
import { isMainProcess, Process } from '@common/utils/utils';
import { Provider } from '@common/plugins/features/providers';
import { INotification } from '@app/notifications/notification';

// The list of availables parameters for the triggers
export type TriggerParams =
    BrowserWindowConstructorOptions |
    ProcessTriggerParam<IConfig> |
    BrowserWindow |
    typeof app |
    Provider<INotification>;


// A helper type to specify the parameter for a trigger which can
// be called in both main and renderer process.
export type ProcessTriggerParam<P> = {

    param: P;
    process: Process;
}

/**
 * Get a process trigger param with the given param, and automaticaly
 * fill the process.
 *
 * @param param - The param to use
 */
export const getProcessTrigger = <P>(param: P): ProcessTriggerParam<P> => ({

    param,
    process: isMainProcess ? 'main' : 'renderer',
});
