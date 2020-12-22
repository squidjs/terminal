import React, { Component } from 'react';
import './app.scss';
import AppTerminal from './components/terminals/AppTerminal';
import Config, { IConfig } from '../app/config/Config';
import Navbar from './components/navbar/Navbar';
import { defaultConfig } from '../app/config/defaultConfig';

interface Props { }
interface State {

    config: IConfig;
}

export default class App extends Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {

            config: defaultConfig,
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

        this.setState({ config });
    }

    render() {

        return (
            <div className="main" style={{backgroundColor: this.state.config.theme.background}}>
                <Navbar />
                <AppTerminal config={this.state.config} />
            </div>
        )
    }
}
