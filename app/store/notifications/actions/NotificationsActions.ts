import { INotification } from '@app/notifications/notification';

export type NotificationsActions = AddNotificationAction | RemoveNotificationAction;

export type AddNotificationAction = {

	type: 'ADD';
	notification: INotification;
}

export type RemoveNotificationAction = {

	type: 'REMOVE';
    notification: INotification;
}
