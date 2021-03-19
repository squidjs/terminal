import React, { FC, ReactElement, useContext } from 'react';
import { AuthContext } from '@ui/contexts/AuthContext';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import Text from '@ui/components/settings/elements/Text';
import Alert from '@ui/components/settings/elements/Alert';
import Login from '@ui/components/settings/elements/Login';
import { HostsContext } from '@ui/contexts/HostsContext';

const ProfileSection: FC = (): ReactElement => {

    const { hosts, dispatch } = useContext(HostsContext);
    const { auth, setAuth } = useContext(AuthContext);

    /**
     * Logout of the cloud and dispatch the actions.
     */
    const logout = () => {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@app/cloud/cloud').logout();

        dispatch({ type: 'SET', hosts: [] });
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

export default ProfileSection;
