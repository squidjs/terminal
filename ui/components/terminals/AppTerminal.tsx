import React, { Component } from 'react';
import Terminal from '../../../app/Terminal';
import { IConfig } from '../../../app/config/Config';
import { UndefinedObject } from '../../../common/types/types';
import './xterm.scss';

interface Props {

	config: IConfig;
	id: number;
	selected: boolean;
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

		this.trySummonTerminal();
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

		this.state.terminal?.focus();

		if(prevProps.config != this.props.config)
			this.state.terminal?.updateConfig(this.props.config);

		if(!this.state.terminal)
			this.trySummonTerminal();
	}

	render() {

		const className = this.props.selected ? '' : 'hidden';

		return <div className={className} id={`terminal-${this.props.id}`} />
	}

	private trySummonTerminal() {

		if(this.props.selected)
			this.setState({ terminal: new Terminal(this.props.config, this.props.id) });
	}
}
