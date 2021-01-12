import React, { FC, ReactElement, useEffect, createContext, useReducer, Reducer } from 'react';
import { HostsAction, NotificationsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { initializeCloud } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { addNotification } from '@app/store/notifications/actions';
import { cloudUnreachable } from '@common/notifications/notification';

interface Props {

    children: ReactElement;
    dispatch: (action: HostsAction | NotificationsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction | NotificationsAction) => { dispatch(action) } }
}

type Action = { type: 'SET', state: boolean };
type AuthContextType = { auth: boolean, setAuth: (action: Action) => void };
// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultState: AuthContextType = { auth: false, setAuth: (_: Action) => {} }; // eslint-disable-line @typescript-eslint/no-unused-vars

export const AuthContext = createContext<AuthContextType>(defaultState);

const AuthProvider: FC<Props> = ({ children, dispatch }: Props): ReactElement => {

    const [auth, setAuth] = useReducer<Reducer<boolean, Action>>((state: boolean, action: Action) => action.state, false);

    // Initialize cloud when mounted
    useEffect(() => {

        initializeCloud().then(({ shouldLogin, hosts }) => {

            const logged = !shouldLogin;

            setAuth({ type: 'SET', state: logged });

            if(logged)
                dispatch(setHosts(hosts));

        }).catch((err) => {

            console.error(err);
            dispatch(addNotification(cloudUnreachable()));
        });

    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default connect(mapDispatchToProps)(AuthProvider);
