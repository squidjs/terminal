import React, { CSSProperties, FC, ReactElement, MouseEvent, useContext, useEffect, useMemo } from 'react';
import { IWindow } from '@app/Terminal'
import TabIcon from '@ui/components/tabs/tab/TabIcon';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import { remote } from 'electron';
import { nextWindowId } from '@common/utils/utils';
const { Menu } = remote;

interface Props {

    window: IWindow;
}

const Tab: FC<Props> = ({ window }: Props): ReactElement => {

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

    // Set the selected window when mounted
    useEffect(() => {

        dispatch({ type: 'SELECT', window });

    }, []);

    const contextMenu = (event: MouseEvent) => {

        event.stopPropagation();
        menu.popup();
    }

    const tabTitleClass = `tab-title${window.selected ? ' selected' : ''}`;

    return (
        <div
            className="tab"
            onClick={() => dispatch({ type: 'SELECT', window })}
            onContextMenu={contextMenu}
            style={{ '--border': config.theme.border, '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            {
                config.tabsIcons &&
                <TabIcon window={window} />
            }
            <button
                type="button"
                className={tabTitleClass}>{window.name}</button>
            <button
                type="button"
                className="tab-close"
                onClick={() => dispatch({ type: 'DELETE', window })}>x</button>
        </div>
    );
}

export default Tab;
