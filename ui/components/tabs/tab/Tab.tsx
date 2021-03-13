import React, { CSSProperties, FC, ReactElement, useContext, useEffect } from 'react';
import { IWindow } from '@app/Terminal'
import TabIcon from '@ui/components/tabs/tab/TabIcon';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { WindowsContext } from '@ui/contexts/WindowsContext';

interface Props {

    window: IWindow;
}

const Tab: FC<Props> = ({ window }: Props): ReactElement => {

    const { dispatch } = useContext(WindowsContext);
    const config = useContext(ConfigContext)

    // Set the selected window when mounted
    useEffect(() => {

        dispatch({ type: 'SELECT', window });

    }, []);

    const tabTitleClass = `tab-title${window.selected ? ' selected' : ''}`;

    return (
        <div
            className="tab"
            onClick={() => dispatch({ type: 'SELECT', window })}
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
