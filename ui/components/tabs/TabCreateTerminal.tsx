import React, { Component, CSSProperties } from 'react';
import { IConfig } from '../../../common/config/Config';

interface Props {

	config: IConfig;
	createTerminal: () => void;
}

export default class TabCreateTerminal extends Component<Props> {

	render() {

		return <button
					type="button"
					className="tab-create"
					onClick={this.props.createTerminal}
					style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>+</button>;
	}
}
