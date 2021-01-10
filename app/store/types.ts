import { INotification } from '@common/notifications/notification';
import { IWindow } from '@app/Terminal';
import { ISSHHost } from '@common/config/Config';

export type WindowsState = IWindow[];
export type WindowsAction = {

    type: string;
    window: IWindow;
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

export type LoggedState = boolean;
export type LoggedAction = {

    type: string;
    logged: boolean;
}

export type AppState = {

    windows: WindowsState;
    selected: SelectedState;
    notifications: NotificationsState;
    hosts: HostsState;
    logged: LoggedState;
}
