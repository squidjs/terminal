import React, { FC, ReactElement, useEffect, useState, createContext } from 'react';
import { HostsAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { initializeCloud } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';

interface Props {

    children: ReactElement;
    dispatch: (action: HostsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction) => { dispatch(action) } }
}

export const AuthContext = createContext<boolean>(false);

const AuthProvider: FC<Props> = ({ children, dispatch }: Props): ReactElement => {

    const [auth, setAuth] = useState<boolean>(false);

    // Initialize cloud when mounted 
    useEffect(() => {

        initializeCloud().then(({ shouldLogin, hosts }) => {

            const logged = !shouldLogin;

            setAuth(logged);

            if(logged)
                dispatch(setHosts(hosts));
        });
    
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default connect(mapDispatchToProps)(AuthProvider);
