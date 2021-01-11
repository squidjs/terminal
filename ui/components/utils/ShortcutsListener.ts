import { FC, ReactElement, useEffect } from 'react';
import { IConfig } from '@common/config/Config';
import { remote } from 'electron';
import { IShortcut, IShortcutActions } from '@common/config/shortcuts';
import { AppState, SelectedAction, WindowsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IWindow } from '@app/Terminal';
import { createWindow, deleteWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { setSelected } from '@app/store/selected/actions';
const { Menu, MenuItem } = remote;

interface Props {

    children: ReactElement;
    config: IConfig;
    windows: IWindow[];
    selected: number;
    dispatch: (action: WindowsAction | SelectedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction | SelectedAction) => { dispatch(action) } }
}

const ShortcutsListener: FC<Props> = ({ children, config, windows, selected, dispatch }: Props): ReactElement => {

    /**
     * Setup the shortcuts when the component is mounted.
     */
    useEffect(() => setupShortcuts(), []);

    /**
     * Re-setup the shortcuts if they have changed.
     *
     * @param prevProps - The previous props.
     */
    useEffect(() => setupShortcuts(), [config])

    /**
     * Setup all the shortcuts to a Menu, with a accelerator
     * configured in the IShortcut interface.
     */
    const setupShortcuts = () => {

        const menu = new Menu();
        config.shortcuts.forEach((shortcut) => {

            menu.append(new MenuItem({

                label: shortcut.name,
                accelerator: shortcut.keybinds,
                click: () => executeShortcut(shortcut),
            }));
        });

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
                dispatch(createWindow({
                    id: nextWindowId(windows),
                    name: 'Terminal',
                    terminalType: config.defaultShell,
                }));
                break;

            case 'terminal:close':
                dispatch(deleteWindow(windows.find((current) => {

                    return current.id === selected;
                }) as IWindow));
                break;

            case 'terminal:zoomin':
            case 'terminal:zoomout':
                zoom(shortcut.action);
                break;

            case 'terminal:left':
            case 'terminal:right':
                focus(shortcut.action === 'terminal:left');
                break;

            case 'window:devtools':
                remote.getCurrentWindow().webContents.openDevTools({ mode: 'detach' });
                break;

            case 'window:reload':
                remote.getCurrentWindow().reload();
                break;

            default:
                break;
        }
    }

    /**
     * Zoom in or out in the terminal.
     *
     * @param action - The action to execute
     */
    const zoom = (action: IShortcutActions) => {

        remote.getCurrentWindow().webContents.send('shortcuts', action);
    }

    /**
     * Focus the terminal at the given direction if exist.
     *
     * @param left - If we should focus the left or right terminal
     */
    const focus = (left: boolean) => {

        const current = windows.find((current) => current.id === selected);

        if(current) {

            let currentIndex = windows.indexOf(current);

            if(left)
                currentIndex--;
            else
                currentIndex++;

            const toFocus = windows[currentIndex];

            if(toFocus)
                dispatch(setSelected(toFocus.id));
        }
    }

    return children;
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutsListener);
