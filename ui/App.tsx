import React, { Component } from 'react';
import './styles/app.scss';
import AppTerminal from './components/terminals/AppTerminal';
import Config, { IConfig } from '../common/config/Config';
import Navbar from './components/navbar/Navbar';
import { ITerminal } from '../app/Terminal';
import { AppState } from '../app/store/types';
import { connect } from 'react-redux';

interface Props {

    terminals: ITerminal[];
}

interface State {

    config: IConfig;
}

const mapStateToProps = (state: AppState) => ({

    terminals: state.terminals,
});

class App extends Component<Props, State> {

    private mounted: boolean = true;

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

    render() {

        return (
            <div className="main" style={{ backgroundColor: this.state.config.theme.background }}>
                {
                    this.state.config.useBackgroundImage &&
                        <div className="background" style={{ backgroundImage: `url(${this.state.config.backgroundImage})`, opacity: this.state.config.backgroundImageOpacity }} />
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

export default connect(mapStateToProps)(App);
