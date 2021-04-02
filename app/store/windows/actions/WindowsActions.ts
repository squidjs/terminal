import { IWindow } from '@app/Terminal';

export type WindowsActions = CreateWindowAction | DeleteWindowAction | UpdateWindowAction | SelectWindowAction | SetWindowsAction;

export type CreateWindowAction = {

	type: 'CREATE';
	window: IWindow;
}

export type DeleteWindowAction = {

    type: 'DELETE';
    window: IWindow;
}

export type UpdateWindowAction = {

    type: 'UPDATE';
    window: IWindow;
}

export type SelectWindowAction = {

    type: 'SELECT';
    window: IWindow;
}

export type SetWindowsAction = {

    type: 'SET',
    windows: IWindow[];
}
