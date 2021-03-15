import { Plugin } from '@common/plugins/plugin';
import { isDev, isMainProcess } from '@common/utils/utils';
import { TriggerParams } from '@common/plugins/features/hooks';
import electron from 'electron';
import path from 'path';
import fs from 'fs';

const PLUGINS_FOLDER = isDev ?
    path.join(__dirname, 'local') :
    path.join((electron.app || electron.remote.app).getPath('home'), '.squid');

// Keep track of is the plugins has been loaded in the current process
let pluginsLoaded = false;
let plugins: Plugin[] = [];

/**
 * Load a single plugin.
 *
 * @param pluginDir - The path to the plugin
 * @returns The loaded plugin
 */
const loadPlugin = (pluginDir: string): Plugin => {

    let plugin: Plugin;

    if(isDev)
        plugin = require('./local/' + pluginDir + '/index').default;
    else
        plugin = __non_webpack_require__(path.join(PLUGINS_FOLDER, pluginDir, 'index'));

    if(isMainProcess)
        callPluginTrigger(plugin, 'onLoad');

    return plugin;
}

/**
 * Load all the plugins. Can be used to reload the plugin.
 */
const loadPlugins = () => {

    // Reset the plugins list
    plugins = [];

    if(!fs.existsSync(PLUGINS_FOLDER))
        fs.mkdirSync(PLUGINS_FOLDER);

    const pluginsDir = fs.readdirSync(PLUGINS_FOLDER);

    pluginsDir.forEach((pluginDir) => {

        plugins.push(loadPlugin(pluginDir));
    });

    pluginsLoaded = true;
}

/**
 * Call a trigger for the given plugin, and use optional parameter which
 * is a HookParam.
 *
 * @param plugin - The plugin to call the trigger on
 * @param trigger - The trigger to call
 * @param param - An optional parameter
 * @returns The modifier parameter or undefined if no parameter was provided
 */
const callPluginTrigger = <T extends TriggerParams>(plugin: Plugin, trigger: keyof Plugin, param?: T): T => {

    if(trigger in plugin)
        return param ? plugin[trigger](param) : plugin[trigger]();

    return param as T;
}

/**
 * Call a trigger for all the plugins, and and optional parameter which
 * is a HookParam. We cache the result of each plugin's trigger and return
 * it after trigger all the plugins.
 *
 * @param trigger - The trigger to call
 * @param param - An optional parameter
 * @returns The modifier parameter or undefined if no parameter was provided
 */
export const callTrigger = <T extends TriggerParams>(trigger: keyof Plugin, param?: T): T => {

    if(!pluginsLoaded)
        loadPlugins();

    let cache: T | undefined = param;

    plugins.forEach((plugin) => {

        cache = callPluginTrigger(plugin, trigger, cache ? cache : param);
    });

    return cache as T;
}
