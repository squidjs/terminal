import { TerminalsState, TerminalsAction } from '../types';
import { TERMINALS_ACTION_TYPES } from './actions';
import Config from '../../../common/config/Config';

// Set initial terminal object with id to 0, as in selected's reducer
export const initialState: TerminalsState = [{
    id: 0,
    name: 'Terminal',
    shell: Config.getInstance().loadConfig().defaultShell,
}];

/**
 * Reducer for the terminals array. We can create, delete
 * or update a terminal.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const terminals = (state: TerminalsState = initialState, action: TerminalsAction) => {

    switch(action.type) {

        case TERMINALS_ACTION_TYPES.CREATE:
            return [
                ...state,
                action.terminal,
            ];

        case TERMINALS_ACTION_TYPES.DELETE:
            return [...state].filter((current) => current.id !== action.terminal.id);

        case TERMINALS_ACTION_TYPES.UPDATE:
            return [...state].map((current) => current.id === action.terminal.id ? action.terminal : current);

        default:
            return state;
    }
}
