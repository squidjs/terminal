import { TerminalsAction } from '@app/store/types';
import { ITerminal } from '@app/Terminal';

export enum TERMINALS_ACTION_TYPES {

    CREATE = 'TERMINALS/CREATE',
    DELETE = 'TERMINALS/DELETE',
    UPDATE = 'TERMINALS/UPDATE',
}

export const createTerminal = (terminal: ITerminal): TerminalsAction => ({

    type: TERMINALS_ACTION_TYPES.CREATE,
    terminal,
});

export const deleteTerminal = (terminal: ITerminal): TerminalsAction => ({

    type: TERMINALS_ACTION_TYPES.DELETE,
    terminal,
});

export const updateTerminal = (terminal: ITerminal): TerminalsAction => ({

    type: TERMINALS_ACTION_TYPES.UPDATE,
    terminal,
});
