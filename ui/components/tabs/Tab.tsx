import React, { Component } from 'react';
import { ITerminal } from '../../../app/Terminal';

interface Props {

	terminal: ITerminal;
	selectTerminal: (terminal: ITerminal) => void;
	deleteTerminal: (terminal: ITerminal) => void;
}

export default class Tab extends Component<Props> {

	render() {

		return (
			<div className="tab" onClick={() => this.props.selectTerminal(this.props.terminal)}>
				<button
					type="button"
					className="tab-title">{this.props.terminal.name}</button>
				<button
					type="button"
					className="tab-close"
					onClick={() => this.props.deleteTerminal(this.props.terminal)}
				>x</button>
			</div>
		);
	}
}
