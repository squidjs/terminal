import { WindowsState, WindowsAction } from '@app/store/types';
import { WINDOWS_ACTION_TYPES } from '@app/store/windows/actions';
import Config from '@common/config/Config';

// Set initial terminal object with id to 0, as in selected's reducer
export const initialState: WindowsState = [{
    id: 0,
    name: 'Terminal',
    terminalType: Config.getInstance().loadConfig().defaultShell,
}];

/**
 * Reducer for the windows array. We can create, delete
 * or update a windows.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const windows = (state: WindowsState = initialState, action: WindowsAction) => {

    switch(action.type) {

        case WINDOWS_ACTION_TYPES.CREATE:
            return [
                ...state,
                action.window,
            ];

        case WINDOWS_ACTION_TYPES.DELETE:
            return [...state].filter((current) => current.id !== action.window.id);

        case WINDOWS_ACTION_TYPES.UPDATE:
            return [...state].map((current) => current.id === action.window.id ? action.window : current);

        default:
            return state;
    }
}
