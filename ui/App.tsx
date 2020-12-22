import React, { Component } from 'react';
import './app.scss';
import AppTerminal from './components/terminals/AppTerminal';
import Config, { IConfig } from '../app/config/Config';
import Navbar from './components/navbar/Navbar';
import { defaultConfig } from '../app/config/defaultConfig';
import { ITerminal } from '../app/Terminal';
import { remote } from 'electron';

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
            }],
            selected: 0,
        });
    }

    render() {

        return (
            <div className="main" style={{backgroundColor: this.state.config.theme.background}}>
                <Navbar
                    terminals={this.state.terminals}
                    selectTerminal={(terminal) => this.selectTerminal(terminal)}
                    deleteTerminal={({ id }) => this.deleteTerminal(id)}
                    createTerminal={() => this.createTerminal() }/>
                {
                    this.state.terminals.map((terminal) =>
                        <AppTerminal
                            key={terminal.id}
                            config={this.state.config}
                            id={terminal.id}
                            selected={terminal.id === this.state.selected}
                            deleteTerminal={(id) => this.deleteTerminal(id) } />
                    )
                }
            </div>
        )
    }

    /**
     * Select a terminal to be focused.
     *
     * @param terminal - The terminal to focus.
     */
    private selectTerminal(terminal: ITerminal) {

        const selected = terminal.id;

        this.setState({ selected });
    }

    /**
     * Create a new terminal.
     */
    private createTerminal() {

        const id = this.state.terminals.length + 1;

        this.setState({

            terminals: [
                ...this.state.terminals,
                {
                    id,
                    name: `Terminal ${id}`,
                }
            ],
            selected: id,
        });
    }

    /**
     * Delete the terminal with the given id.
     *
     * @param id - The id of the terminal to delete
     */
    private deleteTerminal(id: number) {

        let terminals = [...this.state.terminals];
        terminals = terminals.filter((current) => current.id !== id);

        // The next id of the terminal to be selected
        const selected = terminals.length > 0 ? terminals[0].id : -1;

        if(selected != -1)
            this.setState({ terminals, selected });
        else
            remote.getCurrentWindow().close();
    }
}
