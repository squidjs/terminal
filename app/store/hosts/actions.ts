import { ISSHHost } from '@common/config/Config';
import { HostsAction } from '@app/store/types';

export enum HOSTS_ACTION_TYPES {

    SET = 'HOSTS/SET',
}

/**
 * Set the current hosts list.
 *
 * @param hosts - The hosts to set
 */
export const setHosts = (hosts: ISSHHost[]): HostsAction => ({

    type: HOSTS_ACTION_TYPES.SET,
    hosts,
});
