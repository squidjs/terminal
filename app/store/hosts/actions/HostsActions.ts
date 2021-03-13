import { ISSHHost } from '@common/config/Config';

export type HostsActions = SetHostsAction | AddHostAction;

export type SetHostsAction = {

	type: 'SET';
	hosts: ISSHHost[];
}

export type AddHostAction = {

    type: 'ADD';
    host: ISSHHost;
}
