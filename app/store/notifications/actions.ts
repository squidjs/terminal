import { INotification } from '@common/notifications/notification';
import { NotificationsAction } from '@app/store/types';

export enum NOTIFICATIONS_ACTION_TYPES {

    ADD = 'NOTIFICATIONS/ADD',
    REMOVE = 'NOTIFICATIONS/REMOVE',
}

export const addNotification = (notification: INotification): NotificationsAction => ({

    type: NOTIFICATIONS_ACTION_TYPES.ADD,
    notification,
});

export const removeNotification = (notification: INotification): NotificationsAction => ({

    type: NOTIFICATIONS_ACTION_TYPES.REMOVE,
    notification,
});
