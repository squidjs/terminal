import React, { FC, ReactElement, useEffect, useContext } from 'react';
import Window from '@ui/windows/Window';
import Navbar from '@ui/components/navbar/buttons/Navbar';
import { IWindow } from '@app/Terminal';
import { AppState, SelectedAction } from '@app/store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setSelected } from '@app/store/selected/actions';
import { remote } from 'electron';
import ShortcutsListener from '@ui/utils/ShortcutsListener';
import Notifications from '@ui/components/notifications/Notifications';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import './styles/app.scss';

interface Props {

    windows: IWindow[];
    selected: number;
    dispatch: (action: SelectedAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: SelectedAction) => { dispatch(action) } }
}

const App: FC<Props> = ({ windows, selected, dispatch }: Props): ReactElement => {

    const config = useContext(ConfigContext);

    /**
     * Find if the current selected terminal has been destroyed. If so,
     * focus the terminal with the smallest id. If there are now windows
     * left, we close the window.
     */
    useEffect(() => {

        if(windows.find((current) => current.id === selected))
            return;

        if(windows.length >= 1) {

            const { id } = windows[0];
            dispatch(setSelected(id));

        } else
            remote.getCurrentWindow().close();

    }, [windows]);

    return (
        <ShortcutsListener config={config}>
            <div className="main" style={{ backgroundColor: config.theme.background }}>
                {
                    config.backgroundImage.enabled &&
                        <div className="background" style={{ backgroundImage: `url(file://${config.backgroundImage.image})`, opacity: config.backgroundImage.opacity }} />
                }
                <Navbar />
                {
                    windows.map((window) =>
                        <Window
                            key={window.id}
                            config={config}
                            window={window} />
                    )
                }
                <div className="border" style={{ boxShadow: `0 0 0 1px inset ${config.theme.border}` }} />
                <Notifications />
            </div>
        </ShortcutsListener>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
