import { INotification } from '@common/notifications/notification';
import { ITerminal } from '@app/Terminal';
import { ISSHHost } from '@common/config/Config';

export type TerminalsState = ITerminal[];
export type TerminalsAction = {

    type: string;
    terminal: ITerminal;
}

export type SelectedState = number;
export type SelectedAction = {

    type: string;
    selected: number;
}

export type NotificationsState = INotification[];
export type NotificationsAction = {

    type: string;
    notification: INotification;
}

export type HostsState = ISSHHost[];
export type HostsAction = {

    type: string;
    hosts: ISSHHost[];
}

export type AppState = {

    terminals: TerminalsState;
    selected: SelectedState;
    notifications: NotificationsState;
    hosts: HostsState;
}
