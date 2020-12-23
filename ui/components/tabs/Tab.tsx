import React, { Component, CSSProperties } from 'react';
import { ITerminal } from '../../../app/Terminal';
import { IConfig } from '../../../app/config/Config';

interface Props {

	config: IConfig;
	terminal: ITerminal;
	selectTerminal: (terminal: ITerminal) => void;
	deleteTerminal: (terminal: ITerminal) => void;
}

export default class Tab extends Component<Props> {

	render() {

		return (
			<div
				className="tab"
				onClick={() => this.props.selectTerminal(this.props.terminal)}
				style={{ '--border': this.props.config.theme.border } as CSSProperties}>
				<button
					type="button"
					className="tab-title"
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>{this.props.terminal.name}</button>
				<button
					type="button"
					className="tab-close"
					onClick={() => this.props.deleteTerminal(this.props.terminal)}
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>x</button>
			</div>
		);
	}
}
