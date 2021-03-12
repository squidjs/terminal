import { HookParams, Plugin } from '@common/plugins/Plugin';
import { isMainProcess } from '@common/utils/utils';

let pluginsLoaded = false;
const plugins: Plugin[] = [];

const loadPlugins = () => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const plugin = require('./TestPlugin').default;

    if(isMainProcess)
        callPluginHook(plugin, 'onAppLoaded');

    plugins.push(plugin);

    pluginsLoaded = true;
}

export const callHook = <T extends HookParams>(hook: keyof Plugin, param?: T): T => {

    if(!pluginsLoaded)
        loadPlugins();

    let cache: T | undefined = param;

    plugins.forEach((plugin) => {

        cache = callPluginHook(plugin, hook, param);
    });

    return cache as T;
}

const callPluginHook = <T extends HookParams>(plugin: Plugin, hook: keyof Plugin, param?: T): T => {

    if(hook in plugin)
        return param ? plugin[hook](param) : plugin[hook]();

    return param as T;
}
