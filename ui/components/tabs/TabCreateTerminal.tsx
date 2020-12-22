import React, { Component } from 'react';

interface Props {

	createTerminal: () => void;
}

export default class TabCreateTerminal extends Component<Props> {

	render() {

		return <button
					type="button"
					className="tab-create"
					onClick={this.props.createTerminal}
					>+</button>;
	}
}
