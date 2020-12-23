import React, { Component } from 'react';
import { ITerminal } from '../../../app/Terminal';
import Tab from './Tab';
import TabCreateTerminal from './TabCreateTerminal';
import { IConfig } from '../../../app/config/Config';
import '../../styles/tabs.scss';

interface Props {

	config: IConfig
	terminals: ITerminal[];
	selectTerminal: (terminal: ITerminal) => void;
	createTerminal: () => void;
	deleteTerminal: (terminal: ITerminal) => void;
}

export default class Tabs extends Component<Props> {

	render() {

		return (
			<div className="tabs">
				{
					this.props.terminals.map((terminal) =>
						<Tab
							config={this.props.config}
							key={terminal.id}
							terminal={terminal}
							selectTerminal={this.props.selectTerminal}
							deleteTerminal={this.props.deleteTerminal}/>
					)
				}
				<TabCreateTerminal config={this.props.config} createTerminal={this.props.createTerminal} />
			</div>
		)
	}
}
