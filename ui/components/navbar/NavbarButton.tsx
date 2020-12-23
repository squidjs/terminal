import React, { Component, CSSProperties } from 'react';
import { IConfig } from '../../../app/config/Config';

interface Props {

	config: IConfig;
	onClick: () => void;
	path: string;
}

export default class NavbarButton extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		return (
			<button onClick={this.props.onClick} type="button" style={{ '--color': this.props.config.theme.text, '--hover': this.props.config.theme.textHover } as CSSProperties}>
				<svg height="10" width="10">
					<path d={this.props.path} />
				</svg>
			</button>
		)
	}
}
