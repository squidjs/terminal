import React, { Component, CSSProperties } from 'react';
import NavbarButton from './NavbarButton';
import { remote } from 'electron';
import { ITerminal } from '../../../app/Terminal';
import Tabs from '../tabs/Tabs';
import { IConfig } from '../../../common/config/Config';
import '../../styles/navbar.scss';

interface Props {

	config: IConfig;
	terminals: ITerminal[];
	selected: number;
	selectTerminal: (terminal: ITerminal) => void;
	deleteTerminal: (terminal: ITerminal) => void;
	createTerminal: () => void;
}

interface State {

	maximized: boolean;
}

export default class Navbar extends Component<Props, State> {

	constructor(props: Props) {

		super(props);

		this.state = {

			maximized: false,
		};
	}

	render() {

		return (
			<div className="navbar" style={{ '--border': this.props.config.theme.border } as CSSProperties }>
				<Tabs
					config={this.props.config}
					terminals={this.props.terminals}
					selected={this.props.selected}
					selectTerminal={this.props.selectTerminal}
					deleteTerminal={this.props.deleteTerminal}
					createTerminal={this.props.createTerminal} />
				<div className="buttons">
					<NavbarButton
						config={this.props.config}
						onClick={() => this.minimize()}
						path="M 0,5 10,5 10,6 0,6 Z" />
					<NavbarButton
						config={this.props.config}
						onClick={() => this.maximize()}
						path="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z" />
					<NavbarButton
						config={this.props.config}
						onClick={() => this.close()}
						path="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
				</div>
			</div>
		)
	}

	/**
	 * Minimize the current window.
	 */
	private minimize() {

		remote.getCurrentWindow().minimize();
	}

	/**
	 * Maximize or restore the current window.
	 */
	private maximize() {

		this.setState({ maximized: !this.state.maximized });

		if(this.state.maximized)
			remote.getCurrentWindow().unmaximize();
		else
			remote.getCurrentWindow().maximize();
	}

	/**
	 * Close the current window.
	 */
	private close() {

		remote.getCurrentWindow().close();
	}
}
