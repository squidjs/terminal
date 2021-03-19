import React, { FC, ReactElement, useEffect, createContext, useReducer, Reducer, useContext } from 'react';
import { cloudUnreachable } from '@app/notifications/notification';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';
import { HostsContext } from '@ui/contexts/HostsContext';
import { ISSHHost } from '@common/config/Config';

interface Props {

    children: ReactElement;
}

type Action = { type: 'SET', state: boolean };
type AuthContextType = { auth: boolean, setAuth: (action: Action) => void };
// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultState: AuthContextType = { auth: false, setAuth: (_: Action) => {} }; // eslint-disable-line @typescript-eslint/no-unused-vars

export const AuthContext = createContext<AuthContextType>(defaultState);

const AuthProvider: FC<Props> = ({ children }: Props): ReactElement => {

    const { dispatch } = useContext(HostsContext);
    const { dispatch: dispatchNotification } = useContext(NotificationsContext);
    const [auth, setAuth] = useReducer<Reducer<boolean, Action>>((state: boolean, action: Action) => action.state, false);

    // Initialize cloud when mounted
    useEffect(() => {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@app/cloud/cloud').initializeCloud().then(({ shouldLogin, hosts }: { shouldLogin: boolean, hosts: ISSHHost[] }) => {

            const logged = !shouldLogin;

            setAuth({ type: 'SET', state: logged });

            if(logged)
                dispatch({ type: 'SET', hosts });

        }).catch((err: Error) => {

            console.error(err);
            dispatchNotification({ type: 'ADD', notification: cloudUnreachable() });
        });

    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
