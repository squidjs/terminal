import { LoggedAction } from '@app/store/types';

export enum LOGGED_ACTION_TYPES {

    SET = 'LOGGED/SET',
}

/**
 * Set if the user is currently logged or not.
 *
 * @param logged - If we are logged
 */
export const setLogged = (logged: boolean): LoggedAction => ({

    type: LOGGED_ACTION_TYPES.SET,
    logged,
});
