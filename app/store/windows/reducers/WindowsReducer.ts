import { IWindow } from '@app/Terminal';
import { WindowsActions } from '@app/store/windows/actions/WindowsActions';

export const windowsReducer = (state: IWindow[], action: WindowsActions): IWindow[] => {

	switch(action.type) {

		case 'CREATE':
			return [...state, action.window];

        case 'DELETE':
            return [...state].filter((current) => current.id !== action.window.id);

        case 'UPDATE':
            return [...state].map((current) => current.id === action.window.id ? action.window : current);

        case 'SELECT':
            return select(action.window, state);

        case 'SET':
            return action.windows;

        default:
            return state;
	}
}

const select = (window: IWindow, state: IWindow[]): IWindow[] => {

    const newState = [...state];
    newState.forEach((current) => current.selected = current.id === window.id);

    return newState;
}
