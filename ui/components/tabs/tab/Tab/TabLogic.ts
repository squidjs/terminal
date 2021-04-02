import { MouseEvent, useContext, useMemo } from 'react';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { nextWindowId } from '@common/utils/utils';
import { remote } from 'electron';
import { IWindow } from '@app/Terminal';
const { Menu } = remote;

const useTab = (window: IWindow) => {

    const { windows, dispatch } = useContext(WindowsContext);
    const config = useContext(ConfigContext);
    const menu = useMemo(() => Menu.buildFromTemplate([
        {
            label: 'Close tab',
            click: () => dispatch({ type: 'DELETE', window }),
        },
        {
            label: 'Close others tabs',
            enabled: windows.length > 1,
            click: () => dispatch({ type: 'SET', windows: [window] }),
        },
        { type: 'separator' },
        {
            label: 'New tab',
            click: () => dispatch({
                type: 'CREATE',
                window: {
                    id: nextWindowId(windows),
                    name: 'Terminal',
                    terminalType: config.defaultShell,
                    selected: true,
                },
            }),
        },
    ]), [windows]);

    const selectWindow = () => dispatch({ type: 'SELECT', window });
    const deleteWindow = () => dispatch({ type: 'DELETE', window });

    const contextMenu = (event: MouseEvent) => {

        event.stopPropagation();
        menu.popup();
    }

    const tabTitleClass = `tab-title${window.selected ? ' selected' : ''}`;

    return {
        config,
        selectWindow,
        deleteWindow,
        contextMenu,
        tabTitleClass,
    };
}

export default useTab;
