import React, { FC, ReactElement, useContext } from 'react';
import { logout as cloudLogout } from '@app/cloud/cloud';
import { setHosts } from '@app/store/hosts/actions';
import { Dispatch } from 'redux';
import { AppState, HostsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { AuthContext } from '@ui/contexts/AuthContext';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import Text from '@ui/components/settings/elements/Text';
import Alert from '@ui/components/settings/elements/Alert';
import { ISSHHost } from '@common/config/Config';
import Login from '@ui/components/settings/elements/Login';

interface Props {

    hosts: ISSHHost[];
    dispatch: (action: HostsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    hosts: state.hosts,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction) => { dispatch(action) } }
}

const ProfileSection: FC<Props> = ({ hosts, dispatch }: Props): ReactElement => {

    const { auth, setAuth } = useContext(AuthContext);

    /**
     * Logout of the cloud and dispatch the actions.
     */
    const logout = () => {

        cloudLogout();

        dispatch(setHosts([]));
        setAuth({ type: 'SET', state: false });
    }

    if(auth)
        return (
            <>
                <Subtitle title="Informations" />
                <Text text="Email: " />
                <Text text={`SSH Hosts in the cloud: ${hosts.length}`} />
                <form onSubmit={logout}>
                    <Subtitle title="Logout" />
                    <Alert type="error" text="You will no longer be able to connect to cloud saved SSH Hosts." />
                    <input
                        type="submit"
                        value="Log out" />
                </form>
            </>
        );

    return <Login />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
