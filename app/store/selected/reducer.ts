import { SelectedState, SelectedAction } from '../types';
import { SELECTED_ACTION_TYPES } from './actions';

// Set initial terminal id to 0, as in terminal's reducer
export const initialState: SelectedState = 0;

/**
 * Reducer for the selected state. Only accept one action,
 * to set the current selected terminal id.
 *
 * @param state - The state to update
 * @param action - The action for this reducer
 */
export const selected = (state: SelectedState = initialState, action: SelectedAction) => {

    switch(action.type) {

        case SELECTED_ACTION_TYPES.SET:
            return action.selected;

        default:
            return state;
    }
}
