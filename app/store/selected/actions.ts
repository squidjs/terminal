import { SelectedAction } from '@app/store/types';

export enum SELECTED_ACTION_TYPES {

    SET = 'SELECTED/SET',
}

/**
 * Set the current selected terminal id.
 *
 * @param selected - The id of the terminal to select
 */
export const setSelected = (selected: number): SelectedAction => ({

    type: SELECTED_ACTION_TYPES.SET,
    selected,
});
