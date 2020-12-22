import React, { Component } from 'react';
import './app.scss';
import AppTerminal from './components/terminals/AppTerminal';
import Config, { IConfig } from '../app/config/Config';
import Navbar from './components/navbar/Navbar';
import { defaultConfig } from '../app/config/defaultConfig';
import { ITerminal } from '../app/Terminal';

interface Props { }
interface State {

    config: IConfig;
    terminals: ITerminal[];
    selected: number;
}

export default class App extends Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {

            config: defaultConfig,
            terminals: [],
            selected: -1,
        };
    }

    /**
     * When the component is mounted, load the config file
     * and set it in the state to load the config.
     */
    async componentDidMount() {

        const config = await Config.getInstance().loadConfig((newConfig: IConfig) => {

            this.setState({ config: newConfig });
        });

        // Set first terminal by default
        this.setState({
            config,
            terminals: [{
                id: 0,
                name: 'Terminal 1',
            },
                {
                    id: 1,
                    name: 'Terminal 2',
                }],
            selected: 0,
        });
    }

    render() {

        return (
            <div className="main" style={{backgroundColor: this.state.config.theme.background}}>
                <Navbar
                    terminals={this.state.terminals}
                    selectTerminal={(terminal) => this.selectTerminal(terminal)} />
                {
                    this.state.terminals.map((terminal) =>
                        <AppTerminal
                            key={terminal.id}
                            config={this.state.config}
                            id={terminal.id}
                            selected={terminal.id === this.state.selected} />
                    )
                }
            </div>
        )
    }

    private selectTerminal(terminal: ITerminal) {

        const selected = terminal.id;

        this.setState({ selected });
    }
}
