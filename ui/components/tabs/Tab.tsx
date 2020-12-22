import React, { Component } from 'react';
import { ITerminal } from '../../../app/Terminal';

interface Props {

	terminal: ITerminal;
	selectTerminal: (terminal: ITerminal) => void;
}

export default class Tab extends Component<Props> {

	render() {

		return <button
			type="button"
			className="tab"
			onClick={() => this.props.selectTerminal(this.props.terminal)}
			>{this.props.terminal.name}</button>;
	}
}
