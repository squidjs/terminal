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

export type HostsState = ISSHHost[];
export type HostsAction = {

    type: string;
    hosts: ISSHHost[];
}

export type AppState = {

    windows: WindowsState;
    selected: SelectedState;
    hosts: HostsState;
}
