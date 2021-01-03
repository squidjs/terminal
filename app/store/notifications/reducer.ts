import { NotificationsState, NotificationsAction } from '../types';
import { NOTIFICATIONS_ACTION_TYPES } from './actions';

// Set initial notifications to empty 
export const initialState: NotificationsState = [];

/**
 * Reducer for the notifications state. We can add or
 * remove a notification.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const notifications = (state: NotificationsState = initialState, action: NotificationsAction) => {

    switch(action.type) {

        case NOTIFICATIONS_ACTION_TYPES.ADD:
            return [
				...state,
				action.notification,
			];

		case NOTIFICATIONS_ACTION_TYPES.REMOVE:
			return [...state].filter((current) => current.content !== action.notification.content);

        default:
            return state;
    }
}
