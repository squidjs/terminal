import React, { Component } from 'react';

interface Props {

	onClick: () => void;
	path: string;
}

export default class NavbarButton extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		return (
			<button onClick={this.props.onClick} type="button">
				<svg height="10" width="10">
					<path d={this.props.path} />
				</svg>
			</button>
		)
	}
}
