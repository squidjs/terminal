import { ISSHHost } from '@common/config/Config';
import { HostsActions } from '@app/store/hosts/actions/HostsActions';

export const hostsReducer = (state: ISSHHost[], action: HostsActions): ISSHHost[] => {

	switch(action.type) {

        case 'SET':
            return action.hosts;

        case 'ADD':
			return [...state, action.host];

        default:
            return state;
	}
}
