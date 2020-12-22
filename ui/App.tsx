import React, { Component } from 'react';
import './app.scss';
import AppTerminal from './terminals/AppTerminal';
import Config, { IConfig } from './config/Config';
import Navbar from './components/navbar/Navbar';
import { defaultConfig } from './config/defaultConfig';

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
