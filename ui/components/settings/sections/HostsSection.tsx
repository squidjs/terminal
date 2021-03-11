import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { createHost } from '@app/cloud/cloud';
import { addHosts } from '@app/store/hosts/actions';
import { Dispatch } from 'redux';
import { HostsAction } from '@app/store/types';
import { connect } from 'react-redux';
import Subtitle from '@ui/components/settings/elements/Subtitle';
import { ISSHHost } from '@common/config/Config';
import Input from '@ui/components/settings/elements/Input';
import Vault from '@app/cloud/Vault';
import Alert from '@ui/components/settings/elements/Alert';

interface Props {

    hosts: ISSHHost[];
    dispatch: (action: HostsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: HostsAction) => { dispatch(action) } }
}

const HostsSection: FC<Props> = ({ dispatch }: Props): ReactElement => {

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
        dispatch(addHosts([createdHost]));

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

export default connect(mapDispatchToProps)(HostsSection);
