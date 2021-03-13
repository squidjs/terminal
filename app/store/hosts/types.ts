import { ISSHHost } from '@common/config/Config';
import { HostsActions } from '@app/store/hosts/actions/HostsActions';

export type HostsContextType = {

    hosts: ISSHHost[];
    dispatch: (action: HostsActions) => void;
}
