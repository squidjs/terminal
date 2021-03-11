import { ISSHHost } from '@common/config/Config';
import { HostsAction } from '@app/store/types';

export enum HOSTS_ACTION_TYPES {

    SET = 'HOSTS/SET',
    ADD = 'HOSTS/ADD',
}

/**
 * Set the current hosts list.
 *
 * @param hosts - The hosts to set
 * @returns A host action
 */
export const setHosts = (hosts: ISSHHost[]): HostsAction => ({

    type: HOSTS_ACTION_TYPES.SET,
    hosts,
});

/**
 * Add hosts to the hosts list.
 *
 * @param hosts - The hosts to add
 * @returns A host action
 */
export const addHosts = (hosts: ISSHHost[]): HostsAction => ({

    type: HOSTS_ACTION_TYPES.SET,
    hosts,
});
