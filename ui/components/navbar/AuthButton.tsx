import React, { CSSProperties, FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState, HostsAction, LoggedAction, WindowsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { initializeCloud } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { IConfig } from '@common/config/Config';
import { createWindow } from '@app/store/windows/actions';
import { nextWindowId } from '@common/utils/utils';
import { IWindow } from '@app/Terminal';
import { setLogged } from '@app/store/logged/actions';

interface Props {

    config: IConfig;
    windows: IWindow[];
    logged: boolean;
    dispatch: (action: HostsAction | WindowsAction | LoggedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    logged: state.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction | WindowsAction | LoggedAction) => { dispatch(action) } }
}

const AuthButton: FC<Props> = ({ config, windows, logged, dispatch }: Props): ReactElement | null => {

    const onClick = () => dispatch(createWindow({

        id: nextWindowId(windows),
        name: 'Settings',
        // @ts-ignore
        terminalType: null,
    }));

    useEffect(() => {

        // Initialize cloud when mounted
        initializeCloud().then(({ shouldLogin, hosts }) => {

            const logged = !shouldLogin;

            dispatch(setLogged(logged));

            if(logged)
                dispatch(setHosts(hosts));
        });

    }, []);

    if(!logged)
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
