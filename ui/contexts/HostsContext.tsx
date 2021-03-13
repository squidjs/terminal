import React, { FC, ReactElement, createContext, useReducer, Reducer } from 'react';
import { ISSHHost } from '@common/config/Config';
import { HostsContextType } from '@app/store/hosts/types';
import { HostsActions } from '@app/store/hosts/actions/HostsActions';
import { hostsReducer } from '@app/store/hosts/reducers/HostsReducer';

interface Props {

    children: ReactElement;
}

const defaultState: HostsContextType = {

    hosts: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_: HostsActions) => null,
}

export const HostsContext = createContext<HostsContextType>(defaultState);

const HostsProvider: FC<Props> = ({ children }: Props): ReactElement => {

    const [hosts, dispatch] = useReducer<Reducer<ISSHHost[], HostsActions>>(hostsReducer, []);

    return (
        <HostsContext.Provider value={{ hosts, dispatch }}>
            { children }
        </HostsContext.Provider>
    );
}

export default HostsProvider;
