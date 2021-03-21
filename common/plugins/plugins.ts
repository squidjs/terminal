import { SquidPlugin } from '@common/plugins/package/src';
import { isDev, isMainProcess } from '../utils/utils';
import { TriggerParams } from '@common/plugins/hooks';
import electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import Config from '@common/config/Config';

const PLUGINS_FOLDER = isDev ?
    path.join(__dirname, 'local') :
    path.join((electron.app || electron.remote.app).getPath('home'), '.squid');

// Keep track of is the plugins has been loaded in the current process
let pluginsLoaded = false;
let plugins: SquidPlugin[] = [];

/**
 * Load a single plugin.
 *
 * @param pluginDir - The path to the plugin
 * @returns The loaded plugin
 */
const loadPlugin = (pluginDir: string): SquidPlugin => {

    let plugin: SquidPlugin;

    if(isDev)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        plugin = require('./local/' + pluginDir + '/dist/index').default;
    else
        plugin = __non_webpack_require__(path.join(PLUGINS_FOLDER, pluginDir, 'dist', 'index'));

    if(isMainProcess)
        callPluginTrigger(plugin, 'onLoad');

    return plugin;
}

/**
 * Load all the plugins. Can be used to reload the plugin.
 */
const loadPlugins = () => {

    const { plugins: enabledPlugins } = Config.getInstance().getHooklessConfig();

    // Reset the plugins list
    plugins = [];

    if(!fs.existsSync(PLUGINS_FOLDER))
        fs.mkdirSync(PLUGINS_FOLDER);

    const pluginsDir = fs.readdirSync(PLUGINS_FOLDER);

    pluginsDir
        .filter((pluginDir) => enabledPlugins.includes(pluginDir))
        .forEach((pluginDir) => {

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
const callPluginTrigger = <T extends TriggerParams>(plugin: SquidPlugin, trigger: keyof SquidPlugin, param?: T): T => {

    if(trigger in plugin)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
export const callTrigger = <T extends TriggerParams>(trigger: keyof SquidPlugin, param?: T): T => {

    if(!pluginsLoaded || trigger === 'hookConfig')
        loadPlugins();

    let cache: T | undefined = param;

    plugins.forEach((plugin) => {

        cache = callPluginTrigger(plugin, trigger, cache ? cache : param);
    });

    return cache as T;
}
