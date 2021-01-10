import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { HostsAction, LoggedAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { initializeCloud } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { setLogged } from '@app/store/logged/actions';

interface Props {

    children: ReactElement;
    dispatch: (action: HostsAction | LoggedAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction | LoggedAction) => { dispatch(action) } }
}

const AuthProvider: FC<Props> = ({ children, dispatch }: Props): ReactElement | null => {

    useEffect(() => {

        // Initialize cloud when mounted
        initializeCloud().then(({ shouldLogin, hosts }) => {

            const logged = !shouldLogin;

            dispatch(setLogged(logged));

            if(logged)
                dispatch(setHosts(hosts));
        });

    }, []);

    return children;
}

export default connect(mapDispatchToProps)(AuthProvider);
