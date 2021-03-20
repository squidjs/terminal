import { FC, ReactElement, useContext, useEffect } from 'react';
import { IConfig } from '@common/config/Config';
import { ipcRenderer, remote } from 'electron';
import { IShortcut, IShortcutActions } from '@common/shortcuts/shortcuts';
import { nextWindowId } from '@common/utils/utils';
import { buildMenu } from '@app/menu/menu';
import { WindowsContext } from '@ui/contexts/WindowsContext';
const { Menu } = remote;

interface Props {

    children: ReactElement;
    config: IConfig;
}

const ShortcutsListener: FC<Props> = ({ children, config }: Props): ReactElement => {

    const { windows, dispatch } = useContext(WindowsContext);
    const selected = windows.find((current) => current.selected);

    /**
     * Listen for menu ipc message to show app menu
     */
    useEffect(() => {

        ipcRenderer.on('menu', () => Menu.getApplicationMenu()?.popup());

    }, []);

    /**
     * Setup the shortcuts if they have changed.
     */
    useEffect(() => setupShortcuts(), [config.shortcuts, selected?.id])

    /**
     * Setup all the shortcuts to a Menu, with a accelerator
     * configured in the IShortcut interface.
     */
    const setupShortcuts = () => {

        const menu = buildMenu(config, executeShortcut);
        Menu.setApplicationMenu(menu);
    }


    /**
     * Execute a specific shortcut.
     *
     * @param shortcut - The shortcut to execute
     */
    const executeShortcut = (shortcut: IShortcut) => {

        switch(shortcut.action) {

            case 'terminal:create':
                dispatch( {
                    type: 'CREATE',
                    window: {
                        id: nextWindowId(windows),
                        name: 'Terminal',
                        terminalType: config.defaultShell,
                        selected: true,
                    },
                });
                break;

            case 'terminal:close':
                if(!selected)
                    break;

                dispatch({
                    type: 'DELETE',
                    window: selected,
                });
                break;

            case 'terminal:zoomin':
            case 'terminal:zoomout':
            case 'default:copy':
            case 'default:paste':
                sendToWindow(shortcut.action);
                break;

            case 'terminal:left':
            case 'terminal:right':
                focus(shortcut.action === 'terminal:left');
                break;

            default:
                break;
        }
    }

    /**
     * Send a shortcut to the window.
     *
     * @param action - The action to execute
     */
    const sendToWindow = (action: IShortcutActions) => remote.getCurrentWindow().webContents.send('shortcuts', action);

    /**
     * Focus the terminal at the given direction if exist.
     *
     * @param left - If we should focus the left or right terminal
     */
    const focus = (left: boolean) => {

        if(!selected)
            return;

        let currentIndex = windows.indexOf(selected);

        left ? currentIndex-- : currentIndex++;

        const toFocus = windows[currentIndex];

        if(toFocus)
            dispatch({ type: 'SELECT', window: toFocus });
    }

    return children;
}

export default ShortcutsListener;
