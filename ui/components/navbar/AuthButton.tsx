import React, { CSSProperties, FC, ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, HostsAction, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { initializeCloud } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { IConfig } from '@common/config/Config';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { IWindow } from '@app/Terminal';

interface Props {

    config: IConfig;
    windows: IWindow[];
    dispatch: (action: HostsAction | WindowsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction | WindowsAction) => { dispatch(action) } }
}

const AuthButton: FC<Props> = ({ config, windows, dispatch }: Props): ReactElement | null => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const onClick = () => dispatch(createWindow({

        id: nextWindowId(windows),
        name: 'Settings',
        // @ts-ignore
        terminalType: null,
    }));

    useEffect(() => {

        // Initialize cloud when mounted
        initializeCloud().then(({ shouldLogin, hosts }) => {

            setLoggedIn(!shouldLogin);

            if(!shouldLogin)
                dispatch(setHosts(hosts));
        });

    }, []);

    if(!loggedIn)
        return (
            <button onClick={onClick} className="auth" type="button">
                <i className="nf nf-fa-user_times" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties} />
            </button>
        );

    return (
        <button onClick={onClick} className="auth" type="button" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            <i className="nf nf-fa-user" style={{ '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties} />
        </button>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
