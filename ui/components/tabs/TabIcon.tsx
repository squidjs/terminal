import React, { Component } from 'react';
import { Tuple, UndefinedObject } from '@common/types/types';
import { ITerminal } from '@app/Terminal';

interface Props {

	terminal: ITerminal;
}

export default class TabIcon extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		const icon = this.getIcon();

		// Only render the icon if it's actually defined
		if(icon) {

			const [iconPath, color] = icon;
			return <i className={`icon nf nf-${iconPath}`} style={{ color }} />;
		}

		return null;
	}

	/**
	 * Resolve the icon to use based on the title
	 * of the terminal passed in the props.
	 *
	 * @returns A tuple of the path to the icon and the color
	 */
	private getIcon(): UndefinedObject<Tuple<string, string>> {

		let icon: UndefinedObject<Tuple<string, string>>;

		// TODO need refactor
		if(this.props.terminal.name.startsWith('vim'))
			icon = ['custom-vim', '#019833'];

		return icon;
	}
}
