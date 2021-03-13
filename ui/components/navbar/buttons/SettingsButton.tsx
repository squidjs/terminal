import React, { CSSProperties, FC, ReactElement, useContext } from 'react';
import { nextWindowId } from '@common/utils/utils';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { AuthContext } from '@ui/contexts/AuthContext';
import { WindowsContext } from '@ui/contexts/WindowsContext';

const SettingsButton: FC = (): ReactElement | null => {

    const { windows, dispatch } = useContext(WindowsContext);
    const { theme } = useContext(ConfigContext);
    const { auth } = useContext(AuthContext);

    // Open the settings windows on click
    const onClick = () => dispatch({
        type: 'CREATE',
        window: {
            id: nextWindowId(windows),
            name: 'Settings',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            terminalType: null,
            selected: false,
        },
    });

    return (
        auth ?
            <button onClick={onClick} className="auth" type="button" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties}>
                <i className="nf nf-fa-user" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
            </button>
            :
            <button onClick={onClick} className="auth" type="button">
                <i className="nf nf-fa-user_times" style={{ '--color': theme.text, '--hover': theme.textHover } as CSSProperties} />
            </button>
    )
}

export default SettingsButton;
