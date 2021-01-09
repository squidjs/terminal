import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { login as cloudLogin } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { Dispatch } from 'redux';
import { AppState, HostsAction, LoggedAction } from '@app/store/types';
import { connect } from 'react-redux';
import { setLogged } from '@app/store/logged/actions';

interface Props {

    logged: boolean;
    dispatch: (action: HostsAction | LoggedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    logged: state.logged,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction | LoggedAction) => { dispatch(action) } }
}

const Login: FC<Props> = ({ logged, dispatch }: Props): ReactElement => {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>();

    const login = async(event: FormEvent) => {

        event.preventDefault();

        // TODO show error
        if(!email || !password)
            return;

        const hosts = await cloudLogin(email, password);

        dispatch(setHosts(hosts));
        dispatch(setLogged(true));
    }

    if(logged)
        return <h1>You're logged in</h1>;

    return (
        <form onSubmit={login} style={{ userSelect: 'none', zIndex: 1 } as React.CSSProperties}>
            <input
                onChange={({ target }) => setEmail(target.value)}
                type="email"
                placeholder="Enter your email" />
            <input
                onChange={({ target }) => setPassword(target.value)}
                type="password"
                placeholder="Enter your password" />
            <input
                type="submit"
                value="Sign in" />
        </form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
