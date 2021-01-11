import { Component, ReactElement } from 'react';
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

    children: ReactElement,
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

class ShortcutsProvider extends Component<Props> {

    /**
     * Setup the shortcuts when the component is mounted.
     */
    componentDidMount() {

        this.setupShortcuts();
    }

    /**
     * Re-setup the shortcuts if they have changed.
     *
     * @param prevProps - The previous props.
     */
    componentDidUpdate(prevProps: Readonly<Props>) {

        if(prevProps.config.shortcuts != this.props.config.shortcuts)
            this.setupShortcuts();
    }

    render() {

        return this.props.children;
    }

    /**
     * Setup all the shortcuts to a Menu, with a accelerator
     * configured in the IShortcut interface.
     *
     * @see IShortcut
     */
    private setupShortcuts() {

        const menu = new Menu();
        this.props.config.shortcuts.forEach((shortcut) => {

            menu.append(new MenuItem({

                label: shortcut.name,
                accelerator: shortcut.keybinds,
                click: () => this.executeShortcut(shortcut),
            }));
        });

        Menu.setApplicationMenu(menu);
    }

    /**
     * Execute a specific shortcut.
     *
     * @param shortcut - The shortcut to execute
     */
    private executeShortcut(shortcut: IShortcut) {

        switch(shortcut.action) {

            case 'terminal:create':
                this.props.dispatch(createWindow({
                    id: nextWindowId(this.props.windows),
                    name: 'Terminal',
                    terminalType: this.props.config.defaultShell,
                }));
                break;

            case 'terminal:close':
                this.props.dispatch(deleteWindow(this.props.windows.find((current) => {

                    return current.id === this.props.selected;
                }) as IWindow));
                break;

            case 'terminal:zoomin':
            case 'terminal:zoomout':
                this.zoom(shortcut.action);
                break;

            case 'terminal:left':
            case 'terminal:right':
                this.focus(shortcut.action === 'terminal:left');
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
    private zoom(action: IShortcutActions) {

        remote.getCurrentWindow().webContents.send('shortcuts', action);
    }

    /**
     * Focus the terminal at the given direction if exist.
     *
     * @param left - If we should focus the left or right terminal
     */
    private focus(left: boolean) {

        const current = this.props.windows.find((current) => current.id === this.props.selected);

        if(current) {

            let currentIndex = this.props.windows.indexOf(current);

            if(left)
                currentIndex--;
            else
                currentIndex++;

            const toFocus = this.props.windows[currentIndex];

            if(toFocus)
                this.props.dispatch(setSelected(toFocus.id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutsProvider);