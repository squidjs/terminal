import { ITerminal } from '../Terminal';

export type TerminalsState = ITerminal[];
export type TerminalsAction = {

	type: string;
	terminal: ITerminal;
}

export type SelectedState = number;
export type SelectedAction = {

	type: string;
	selected: number;
}

export type AppState = {

	terminals: TerminalsState;
	selected: SelectedState;
}
