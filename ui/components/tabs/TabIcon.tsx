import React, { Component } from 'react';
import { UndefinedObject } from '@common/types/types';
import { ITerminal } from '@app/Terminal';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import IconResolverProvider, { IconResolverType } from '@app/resolvers/IconResolverProvider';

interface Props {

	terminal: ITerminal;
}

export default class TabIcon extends Component<Props> {

	private resolver: ResolverProvider<ITerminal, IconResolverType>;

	constructor(props: Props) {

		super(props);

		this.resolver = new IconResolverProvider();
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
	private getIcon(): UndefinedObject<IconResolverType> {

		return this.resolver.resolve(this.props.terminal);
	}
}
