import React, { Component, CSSProperties } from 'react';
import Window from '@ui/components/window/Window';
import Config, { IConfig } from '@common/config/Config';
import Navbar from '@ui/components/navbar/Navbar';
import { IWindow } from '@app/Terminal';
import { AppState, NotificationsAction, SelectedAction } from '@app/store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setSelected } from '@app/store/selected/actions';
import { remote } from 'electron';
import ShortcutsProvider from '@ui/components/ShortcutsProvider';
import Notifications from '@ui/components/notifications/Notifications';
import { addNotification } from '@app/store/notifications/actions';
import { configReloadedNotification } from '@common/notifications/notification';
import './styles/app.scss';
import AuthProvider from '@ui/components/AuthProvider';

interface Props {

    windows: IWindow[];
    selected: number;
    dispatch: (action: SelectedAction | NotificationsAction) => void;
}

interface State {

    config: IConfig;
}

const mapStateToProps = (state: AppState) => ({

    windows: state.windows,
    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: SelectedAction | NotificationsAction) => { dispatch(action) } }
}

class App extends Component<Props, State> {

    private mounted = true;

    constructor(props: Props) {

        super(props);

        const config = Config.getInstance().loadConfig((newConfig: IConfig) => {

            if(this.mounted) {

                const notification = configReloadedNotification(false);
                this.props.dispatch(addNotification(notification));

                this.setState({ config: newConfig });
            }
        });

        this.state = {

            config,
        };
    }

    componentWillUnmount() {

        this.mounted = false;
    }

    /**
     * Find if the current selected terminal has been destroyed. If so,
     * focus the terminal with the smallest id. If there are now windows
     * left, we close the window.
     *
     * @param prevProps - The previous props
     */
    componentDidUpdate(prevProps: Readonly<Props>) {

        if((prevProps.windows !== this.props.windows) && !this.props.windows.find((current) => current.id === this.props.selected)) {

            if(this.props.windows.length >= 1) {

                const { id } = this.props.windows[0];

                this.props.dispatch(setSelected(id));

            } else
                remote.getCurrentWindow().close();
        }
    }

    render() {

        const borderStyle: CSSProperties = { boxShadow: `0 0 0 1px inset ${this.state.config.theme.border}` };

        return (
            <ShortcutsProvider config={this.state.config}>
                <AuthProvider>
                    <div className="main" style={{ backgroundColor: this.state.config.theme.background }}>
                        {
                            this.state.config.backgroundImage.enabled &&
                                <div className="background" style={{ backgroundImage: `url(${this.state.config.backgroundImage.image})`, opacity: this.state.config.backgroundImage.opacity }} />
                        }
                        <Navbar config={this.state.config} />
                        {
                            this.props.windows.map((window) =>
                                <Window
                                    key={window.id}
                                    config={this.state.config}
                                    window={window} />
                            )
                        }
                        <div className="border" style={borderStyle} />
                        <Notifications config={this.state.config} />
                    </div>
                </AuthProvider>
            </ShortcutsProvider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
