import React, { Component } from 'react';
import { ITerminal } from '../../../app/Terminal';

interface Props {

	terminals: ITerminal[];
	selectTerminal: (terminal: ITerminal) => void;
}

export default class Tabs extends Component<Props> {

	render() {

		return (
			<div className="tabs">
				{
					this.props.terminals.map((terminal) =>
						<button type="button" className="tab" onClick={() => this.props.selectTerminal(terminal)} key={terminal.id}>{terminal.name}</button>
					)
				}
			</div>
		)
	}
}
