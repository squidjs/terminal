import { IWindow } from '@app/Terminal';

export type WindowsActions = CreateWindowAction | DeleteWindowAction | UpdateWindowAction | SelectWindowAction;

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
