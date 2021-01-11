import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { login as cloudLogin, logout as cloudLogout } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { Dispatch } from 'redux';
import { HostsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { AuthContext } from '@ui/contexts/AuthContext';

interface Props {

    dispatch: (action: HostsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction) => { dispatch(action) } }
}

const ProfileSection: FC<Props> = ({ dispatch }: Props): ReactElement => {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>();

    /**
     * Login to the cloud, and if successful dispatch
     * the hosts and logged state.
     *
     * @param event - The form event to prevent
     */
    const login = async(event: FormEvent) => {

        event.preventDefault();

        // TODO show error
        if(!email || !password)
            return;

        const hosts = await cloudLogin(email, password);

        dispatch(setHosts(hosts));

        // TODO dispatch in context
        //dispatch(setLogged(true));
    }

    /**
     * Logout of the cloud and dispatch the actions.
     */
    const logout = () => {

        cloudLogout();

        dispatch(setHosts([]));
        // TODO dispatch in context
        //dispatch(setLogged(false));
    }

    return (
        <AuthContext.Consumer>
            { logged => (
                logged ?
                    <div style={{ userSelect: 'none', zIndex: 1 }}>
                        <h1>You are logged in</h1>
                        <button onClick={logout} type="button">Logout</button>
                    </div>
                :
                    <form onSubmit={login} style={{ userSelect: 'none', zIndex: 1 }}>
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
            )}
        </AuthContext.Consumer>
    );
}

export default connect(mapDispatchToProps)(ProfileSection);
