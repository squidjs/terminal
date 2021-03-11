import React, { Component } from 'react';
import { Dispatch } from 'redux';
import Terminal, { IWindow } from '@app/Terminal';
import { IConfig } from '@common/config/Config';
import { UndefinedObject } from '@common/types/types';
import DragDrop from '@ui/utils/DragDrop';
import { addQuotes, isSettingsWindow, resolveToWSLPath } from '@common/utils/utils';
import { AppState, NotificationsAction, WindowsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { deleteWindow, updateWindow } from '@app/store/windows/actions';
import { ipcRenderer } from 'electron';
import { IShortcutActions } from '@common/config/shortcuts';
import { fontSizeNotification } from '@common/notifications/notification';
import { addNotification } from '@app/store/notifications/actions';
import Settings from '@ui/windows/Settings';
import '@ui/styles/xterm.scss';

interface Props {

    config: IConfig;
    window: IWindow;
    selected: number;
    dispatch: (action: WindowsAction | NotificationsAction) => void;
}

interface State {

    terminal: UndefinedObject<Terminal>;
}

const mapStateToProps = (state: AppState) => ({

    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: WindowsAction | NotificationsAction) => { dispatch(action) } }
}

class Window extends Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {

            terminal: undefined,
        };
    }

    /**
     * Try summoning a new terminal if possible, and
     * listen for events.
     */
    componentDidMount() {

        this.trySummonTerminal();
        this.listen();
    }

    /**
     * Remove all listeners on channels.
     */
    componentWillUnmount() {

        ipcRenderer.removeAllListeners('shortcuts');
        ipcRenderer.removeAllListeners('focus');
    }

    /**
     * When the component update, we check if the props changed, and if so
     * we update the config of the state terminal instance.
     *
     * @param prevProps - The previous props
     */
    componentDidUpdate(prevProps: Readonly<Props>) {

        this.state.terminal?.focus();

        if(prevProps.config != this.props.config)
            this.state.terminal?.updateConfig(this.props.config);

        if(!this.state.terminal)
            this.trySummonTerminal();
    }

    render() {

        const className = this.props.selected === this.props.window.id ? '' : 'hidden';

        if(isSettingsWindow(this.props.window))
            return <Settings className={className} />;

        return (
            <DragDrop handleDrop={(files) => this.handleDrop(files)}>
                <div className={className} id={`window-${this.props.window.id}`} />
            </DragDrop>
        )
    }

    /**
     * Summon a terminal, if selected. We also handle the closing of this
     * terminal. Don't do anything if this is a settings window.
     */
    private trySummonTerminal() {

        if(isSettingsWindow(this.props.window))
            return;

        if(this.props.selected === this.props.window.id) {

            const { config } = this.props;
            const { terminalType, id } = this.props.window;

            const terminal = new Terminal(config, id, terminalType, () => {

                this.props.dispatch(deleteWindow(this.props.window));

            }, (name: string) => {

                this.props.dispatch(updateWindow({ ...this.props.window, name }));
            });

            this.setState({ terminal });
        }
    }

    /**
     * Listen for events from the main ipc. Don't do anything if this
     * is a settings window.
     */
    private listen() {

        if(isSettingsWindow(this.props.window))
            return;

        ipcRenderer.on('shortcuts', (event, args) => {

            const shortcut: IShortcutActions = args;

            if(shortcut && this.props.selected === this.props.window.id) {

                switch(shortcut) {

                    case 'terminal:zoomin':
                    case 'terminal:zoomout':
                        this.zoomAndNotify(shortcut === 'terminal:zoomin');
                        break;

                    case 'default:copy':
                        this.state.terminal?.copySelected();
                        break;

                    case 'default:paste':
                        this.state.terminal?.paste();
                        break;

                    default:
                        break;
                }
            }
        });

        ipcRenderer.on('focus', () => this.state.terminal?.focus());
    }

    /**
     * Zoom in or out in the current window.
     *
     * @param zoomIn - If we should zoom in or out
     */
    private zoomAndNotify(zoomIn: boolean) {

        const zoom = this.state.terminal?.zoom(zoomIn);

        const notification = fontSizeNotification(zoom || 0);
        this.props.dispatch(addNotification(notification));
    }

    /**
     * Handle files dropping to write the path in the terminal.
     *
     * @param files - The dropped file list
     */
    private handleDrop(files: FileList) {

        if(this.props.selected !== this.props.window.id)
            return;

        const filesPath = [];

        for(let i = 0; i < files.length; i++) {

            const wslPath = resolveToWSLPath(this.props.window, files[i].path);

            filesPath.push(addQuotes(wslPath));
        }

        this.state.terminal?.write(filesPath.join(' '));
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
