import React, { Component } from 'react';

interface Props {

	createTerminal: () => void;
}

export default class TabCreateTerminal extends Component<Props> {

	render() {

		return <button
			type="button"
			className="tab"
			onClick={this.props.createTerminal}
			>+</button>;
	}
}
