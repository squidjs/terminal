import { WindowsActions } from '@app/store/windows/actions/WindowsActions';
import { IWindow } from '@app/Terminal';

export type WindowsContextType = {

    windows: IWindow[];
    dispatch: (action: WindowsActions) => void;
}
