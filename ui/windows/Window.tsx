import React, { FC, ReactElement, useContext, useEffect, useRef } from 'react';
import Terminal, { IWindow } from '@app/Terminal';
import { IConfig } from '@common/config/Config';
import DragDrop from '@ui/utils/DragDrop';
import { addQuotes, isSettingsWindow, resolveToWSLPath } from '@common/utils/utils';
import { ipcRenderer } from 'electron';
import { IShortcutActions } from '@common/shortcuts/shortcuts';
import { fontSizeNotification } from '@app/notifications/notification';
import Settings from '@ui/windows/Settings';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import { UndefinedObject } from '@common/types/types';
import '@ui/styles/xterm.scss';

interface Props {

    config: IConfig;
    window: IWindow;
    openPath: UndefinedObject<string>;
}

const Window: FC<Props> = ({ config, window, openPath }: Props): ReactElement => {

    const { dispatch: dispatchNotification } = useContext(NotificationsContext);
    const { windows, dispatch } = useContext(WindowsContext);
    const selected = windows.find((current) => current.selected);
    const terminal = useRef<Terminal>();
    const firstConfigLoaded = useRef(false);

    /**
     * Focus the terminal when anything update, and try summoning
     * it if not exist.
     */
    useEffect(() => {

        terminal.current?.focus();

        trySummonTerminal();
    });

    /**
     * Listen for event on mounted and remove all listeners
     * when unmounted.
     */
    useEffect(() => {

        listen();

        return () => {

            ipcRenderer.removeAllListeners('shortcuts');
            ipcRenderer.removeAllListeners('focus');
        }

    }, []);

    /**
     * When the component update, we check if the props changed, and if so
     * we update the config of the state terminal instance.
     */
    useEffect(() => {

        if(firstConfigLoaded.current)
            terminal.current?.updateConfig(config);
        else
            firstConfigLoaded.current = true;

    }, [config]);

    /**
     * Summon a terminal, if selected. We also handle the closing of this
     * terminal. Don't do anything if this is a settings window.
     */
    const trySummonTerminal = () => {

        if(isSettingsWindow(window) || terminal.current)
            return;

        if(selected?.id === window.id) {

            const { terminalType, id } = window;

            terminal.current = new Terminal(config, id, terminalType, () => {

                dispatch({ type: 'DELETE', window });

            }, (name: string) => {

                dispatch({ type: 'UPDATE', window: { ...window, name } });
            }, openPath);
        }
    }

    /**
     * Listen for events from the main ipc. Don't do anything if this
     * is a settings window or if the window is not selected.
     */
    const listen = () => {

        if(isSettingsWindow(window) || !selected)
            return;

        ipcRenderer.on('shortcuts', (event, args) => {

            const shortcut: IShortcutActions = args;

            if(shortcut && selected?.id === window.id) {

                switch(shortcut) {

                    case 'terminal:zoomin':
                    case 'terminal:zoomout':
                        zoomAndNotify(shortcut === 'terminal:zoomin');
                        break;

                    case 'default:copy':
                        terminal.current?.copySelected();
                        break;

                    case 'default:paste':
                        terminal.current?.paste();
                        break;

                    default:
                        break;
                }
            }
        });

        ipcRenderer.on('focus', () => {

            terminal.current?.focus();
        });
    }

    /**
     * Zoom in or out in the current window.
     *
     * @param zoomIn - If we should zoom in or out
     */
    const zoomAndNotify = (zoomIn: boolean) => {

        const zoom = terminal.current?.zoom(zoomIn);

        const notification = fontSizeNotification(zoom || 0);
        dispatchNotification({ type: 'ADD', notification });
    }

    /**
     * Handle files dropping to write the path in the terminal.
     *
     * @param files - The dropped file list
     */
    const handleDrop = (files: FileList) => {

        if(selected?.id !== window.id)
            return;

        const filesPath = [];

        for(let i = 0; i < files.length; i++) {

            const wslPath = resolveToWSLPath(window, files[i].path);
            filesPath.push(addQuotes(wslPath));
        }

        terminal.current?.write(filesPath.join(' '));
    }

    const className = selected?.id === window.id ? '' : 'hidden';

    if(isSettingsWindow(window))
        return <Settings className={className} />;

    return (
        <DragDrop handleDrop={handleDrop}>
            <div className={className} id={`window-${window.id}`} />
        </DragDrop>
    )
}

export default Window;
