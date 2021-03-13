import { INotification } from '@app/notifications/notification';
import { NotificationsActions } from '@app/store/notifications/actions/NotificationsActions';

export const notificationsReducer = (state: INotification[], action: NotificationsActions): INotification[] => {

	switch(action.type) {

		case 'ADD':
			return [...state, action.notification];

        case 'REMOVE':
            return [...state].filter((current) => current !== action.notification);

        default:
            return state;
	}
}
