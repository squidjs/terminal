import { ISSHHost } from '@common/config/Config';

export type HostsState = ISSHHost[];
export type HostsAction = {

    type: string;
    hosts: ISSHHost[];
}

export type AppState = {

    hosts: HostsState;
}
