import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';
import { IConfig } from '@common/config/Config';
import { ProcessTriggerParam } from '@common/plugins/hooks';

export interface Plugin {

    /**
     * Event when the plugin load.
     *
     * Process: main
     */
    onLoad?: () => void;

    /**
     * Event when the app has loaded.
     *
     * Process: main
     *
     * @param options - The electron app
     */
    onAppLoaded?: (options: typeof app) => void;

    /**
     * Event when the app close.
     *
     * Process: main
     */
    onAppClose?: () => void;

    /**
     * Event called when the window has finished building and has
     * been shown after ready-to-show event.
     *
     * @param options - The browser window
     */
    onWindowShow?: (options: BrowserWindow) => void;

    /**
     * Hook the window options. Called when the browser window is
     * building.
     *
     * Process: main
     *
     * @param options - The browser window options
     * @returns The hooked browser window options
     */
    hookWindowOptions?: (options: BrowserWindowConstructorOptions) => BrowserWindowConstructorOptions;

    /**
     * Hook the config. Called when the config is loaded for the
     * first time, and when the config change.
     *
     * Process: both
     *
     * @param options - The base config
     * @returns The hooked config
     */
    hookConfig?: (options: ProcessTriggerParam<IConfig>) => ProcessTriggerParam<IConfig>;
}
