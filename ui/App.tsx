import React, { Component } from 'react';
import './styles/app.scss';
import AppTerminal from './components/terminals/AppTerminal';
import Config, { IConfig } from '../common/config/Config';
import Navbar from './components/navbar/Navbar';
import { ITerminal } from '../app/Terminal';
import { AppState, SelectedAction } from '../app/store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setSelected } from '../app/store/selected/actions';
import { remote } from 'electron';

interface Props {

    terminals: ITerminal[];
    selected: number;
    dispatch: (action: SelectedAction) => void;
}

interface State {

    config: IConfig;
}

const mapStateToProps = (state: AppState) => ({

    terminals: state.terminals,
    selected: state.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: SelectedAction) => { dispatch(action) } }
}

class App extends Component<Props, State> {

    private mounted = true;

    constructor(props: Props) {

        super(props);

        const config = Config.getInstance().loadConfig((newConfig: IConfig) => {

            if(this.mounted)
                this.setState({ config: newConfig });
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
     * focus the terminal with the smallest id. If there are now terminals
     * left, we close the window.
     *
     * @param prevProps - The previous props
     */
    componentDidUpdate(prevProps: Readonly<Props>) {

        if((prevProps.terminals !== this.props.terminals) && !this.props.terminals.find((current) => current.id === this.props.selected)) {

            if(this.props.terminals.length >= 1) {

                const { id } = this.props.terminals[0];

                this.props.dispatch(setSelected(id));

            } else
                remote.getCurrentWindow().close();
        }
    }

    render() {

        return (
            <div className="main" style={{ backgroundColor: this.state.config.theme.background }}>
                {
                    this.state.config.backgroundImage.enabled &&
                        <div className="background" style={{ backgroundImage: `url(${this.state.config.backgroundImage.image})`, opacity: this.state.config.backgroundImage.opacity }} />
                }
                <Navbar config={this.state.config} />
                {
                    this.props.terminals.map((terminal) =>
                        <AppTerminal
                            key={terminal.id}
                            config={this.state.config}
                            terminal={terminal} />
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
