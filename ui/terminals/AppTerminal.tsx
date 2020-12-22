import React, { Component } from 'react';
import Terminal from './Terminal';
import { IConfig } from '../config/Config';
import { UndefinedObject } from '../../common/types/types';
import './xterm.scss';

interface Props {

	config: IConfig;
}

interface State {

	terminal: UndefinedObject<Terminal>;
}

export default class AppTerminal extends Component<Props, State> {

	constructor(props: Props) {

		super(props);

		this.state = {

			terminal: undefined,
		};
	}

	/**
	 * Create a new Terminal instance for each AppTerminal components.
	 */
	componentDidMount() {

		this.setState({ terminal: new Terminal(this.props.config) });
	}

	/**
	 * When the component update, we check if the props changed, and if so
	 * we update the config of the state terminal instance.
	 *
	 * @param prevProps - The previous props
	 * @param prevState - The previous state
	 * @param snapshot
	 */
	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {

		if(prevProps != this.props)
			this.state.terminal?.updateConfig(this.props.config);
	}

	render() {

		return <div id="terminal" />
	}
}
