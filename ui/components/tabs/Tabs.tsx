import React, { Component } from 'react';
import { ITerminal } from '../../../app/Terminal';
import Tab from './Tab';
import TabCreateTerminal from './TabCreateTerminal';

interface Props {

	terminals: ITerminal[];
	selectTerminal: (terminal: ITerminal) => void;
	createTerminal: () => void;
}

export default class Tabs extends Component<Props> {

	render() {

		return (
			<div className="tabs">
				{
					this.props.terminals.map((terminal) =>
						<Tab
							key={terminal.id}
							terminal={terminal}
							selectTerminal={this.props.selectTerminal} />
					)
				}
				<TabCreateTerminal createTerminal={this.props.createTerminal} />
			</div>
		)
	}
}
