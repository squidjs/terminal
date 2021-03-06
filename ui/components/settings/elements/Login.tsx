import React, { FC, FormEvent, ReactElement, useContext, useState } from 'react';
import { login as cloudLogin } from '@app/cloud/cloud';
import { AuthContext } from '@ui/contexts/AuthContext';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import Text from '@ui/components/settings/elements/Text';
import Alert from '@ui/components/settings/elements/Alert';
import Input from '@ui/components/settings/elements/Input';
import { HostsContext } from '@ui/contexts/HostsContext';

const Login: FC = (): ReactElement => {

    const { dispatch } = useContext(HostsContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAuth } = useContext(AuthContext);

    /**
     * Login to the cloud, and if successful dispatch
     * the hosts and logged state.
     *
     * @param event - The form event to prevent
     */
    const login = async(event: FormEvent) => {

        event.preventDefault();

        setError('');
        setLoading(true);

        if(!email || !password) {

            setError('Please enter your email and password.');
            setLoading(false);
            return;
        }

        try {

            const hosts = await cloudLogin(email, password);

            dispatch({ type: 'SET', hosts });
            setAuth({ type: 'SET', state: true });
            setLoading(false);

        } catch(err) {

            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={login}>
            <Subtitle title="Sign in" />
            <Text text="You must sign in in order to connect to cloud saved SSH Hosts." />
            <Alert type="info" text={loading ? 'Loading...' : ''} />
            <Alert type="error" text={error} />
            <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                setValue={setEmail} />
            <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                setValue={setPassword} />
            <input
                type="submit"
                value="Sign in" />
        </form>
    );
}

export default Login;
