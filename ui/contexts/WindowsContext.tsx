import React, { FC, ReactElement, createContext, useReducer, Reducer } from 'react';
import { WindowsContextType } from '@app/store/windows/types';
import Config from '@common/config/Config';
import { WindowsActions } from '@app/store/windows/actions/WindowsActions';
import { IWindow } from '@app/Terminal';
import { windowsReducer } from '@app/store/windows/reducers/WindowsReducer';

interface Props {

    children: ReactElement;
}

const defaultState: WindowsContextType = {

    windows: [{
        id: 0,
        name: 'Terminal',
        terminalType: Config.getInstance().loadConfig().defaultShell,
        selected: true,
    }],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_: WindowsActions) => null,
}

export const WindowsContext = createContext<WindowsContextType>(defaultState);

const WindowsProvider: FC<Props> = ({ children }: Props): ReactElement => {

    const [windows, dispatch] = useReducer<Reducer<IWindow[], WindowsActions>>(windowsReducer, defaultState.windows);

    return (
        <WindowsContext.Provider value={{ windows, dispatch }}>
            { children }
        </WindowsContext.Provider>
    );
}

export default WindowsProvider;
