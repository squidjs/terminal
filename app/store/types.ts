import { INotification } from '../../common/notifications/notification';
import { ITerminal } from '../Terminal';

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

export type AppState = {

	terminals: TerminalsState;
	selected: SelectedState;
	notifications: NotificationsState;
}
