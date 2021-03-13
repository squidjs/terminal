import React, { FC, FormEvent, ReactElement, useContext, useState } from 'react';
import { createHost } from '@app/cloud/cloud';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import { ISSHHost } from '@common/config/Config';
import Input from '@ui/components/settings/elements/Input';
import Vault from '@app/cloud/Vault';
import Alert from '@ui/components/settings/elements/Alert';
import { HostsContext } from '@ui/contexts/HostsContext';

const HostsSection: FC = (): ReactElement => {

    const { dispatch } = useContext(HostsContext);

    const [name, setName] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState(22);
    const [username, setUsername] = useState('root');
    const [password, setPassword] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const submit = async(event: FormEvent) => {

        event.preventDefault();

        setError('');
        setSuccess(false);

        if(name === '' || host === '' || username === '' || (password === '' && privateKey == '')) {

            setError('Please fill in all the required informations');
            return;
        }

        const vault = Vault.getInstance();
        const vaultData = await vault.getData();

        const sshHost: ISSHHost = {
            name,
            host,
            port,
            username,
            password: password !== '' ? password : undefined,
            privateKey: privateKey !== '' ? privateKey : undefined,
        };

        const createdHost = await createHost(vaultData, sshHost);
        dispatch({ type: 'ADD', host: createdHost });

        setName('');
        setHost('');
        setPort(22);
        setUsername('root');
        setPassword('');
        setPrivateKey('');
        setSuccess(true);
    }

    return (
        <form onSubmit={submit}>
            <Subtitle title="New host" />
            <Alert type="error" text={error} />
            <Alert type="success" text={success ? 'Host created!' : ''} />
            <Input
                placeholder="Name"
                value={name}
                setValue={setName} />
            <Input
                placeholder="Host"
                value={host}
                setValue={setHost} />
            <Input
                placeholder="Port"
                type="number"
                value={port.toString()}
                setValue={(value) => setPort(parseInt(value))} />
            <Input
                placeholder="Username"
                value={username}
                setValue={setUsername} />
            <Input
                placeholder="Password"
                value={password}
                setValue={setPassword} />
            <Input
                placeholder="Private key"
                type="file"
                value={privateKey}
                setValue={setPrivateKey} />
            <input
                type="submit"
                value="Create host" />
        </form>
    );
}

export default HostsSection;
