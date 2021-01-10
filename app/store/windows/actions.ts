import { WindowsAction } from '@app/store/types';
import { IWindow } from '@app/Terminal';

export enum WINDOWS_ACTION_TYPES {

    CREATE = 'WINDOWS/CREATE',
    DELETE = 'WINDOWS/DELETE',
    UPDATE = 'WINDOWS/UPDATE',
}

export const createWindow = (window: IWindow): WindowsAction => ({

    type: WINDOWS_ACTION_TYPES.CREATE,
    window,
});

export const deleteWindow = (window: IWindow): WindowsAction => ({

    type: WINDOWS_ACTION_TYPES.DELETE,
    window,
});

export const updateWindow = (window: IWindow): WindowsAction => ({

    type: WINDOWS_ACTION_TYPES.UPDATE,
    window,
});
