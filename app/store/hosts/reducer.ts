import { HostsState, HostsAction } from '@app/store/types';
import { HOSTS_ACTION_TYPES } from '@app/store/hosts/actions';

// Set initial hosts to an empty array
export const initialState: HostsState = [];

/**
 * Reducer for the hosts state. Only accept one action,
 * to set the current array of hosts.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const hosts = (state: HostsState = initialState, action: HostsAction) => {

    switch(action.type) {

        case HOSTS_ACTION_TYPES.SET:
            return action.hosts;

        default:
            return state;
    }
}
