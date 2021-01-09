import { LoggedState, LoggedAction } from '@app/store/types';
import { LOGGED_ACTION_TYPES } from '@app/store/logged/actions';

// Set initial logged state to false
export const initialState: LoggedState = false;

/**
 * Reducer for the logged state. Only accept one action,
 * to set if the user is logged or not.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const logged = (state: LoggedState = initialState, action: LoggedAction) => {

    switch(action.type) {

        case LOGGED_ACTION_TYPES.SET:
            return action.logged;

        default:
            return state;
    }
}
