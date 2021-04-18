import { BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';
import { IConfig } from '@common/config/Config';
import { ProcessTriggerParam } from '@common/packages/hooks';
import { Provider } from '@common/packages/providers';
import { INotification } from '@app/notifications/notification';
import { IWindow } from '@app/Terminal';
import { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';
import { WindowsActions } from '@app/store/windows/actions/WindowsActions';

export type TabIconParam = {

    window: IWindow;
    icon: IconResolverType;
}

export type WindowsReducerParam = {

    reducedState: IWindow[];
    state: IWindow[];
    action: WindowsActions;
}

export default interface SquidPackage {

    /**
     * Event when the package load.
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
     * Process: main
     *
     * @param options - The browser window
     */
    onWindowShow?: (options: BrowserWindow) => void;

    /**
     * Provide a notifications provider to add a notification. Called
     * at the startup of the app.
     *
     * Process: renderer
     *
     * @param options - The notification provider
     */
    provideNotifications?: (options: Provider<INotification>) => void;

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

    /**
     * Hook the tab icon. Called when the window changes.
     *
     * Process: renderer
     *
     * @param options - An object containing the window and the icon
     * @returns The hooked tab icon
     */
    hookTabIcon?: (options: TabIconParam) => TabIconParam;

    /**
     * Hook the windows reducer. Called whenever the windows reducer
     * is called.
     *
     * Process: renderer
     *
     * @param options - An object containing the initial state, the state and the action
     * @returns The hooked state
     */
    hookWindowsReducer?: (options: WindowsReducerParam) => WindowsReducerParam[];
}
