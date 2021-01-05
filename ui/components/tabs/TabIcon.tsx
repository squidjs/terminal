import React, { Component } from 'react';
import path from 'path';
import { UndefinedObject } from '@common/types/types';

interface Props {

	title: string;
}

export default class TabIcon extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		const iconPath = this.getIcon();

		// Only render the icon if it's actually defined
		if(iconPath)
			return <img className="icon" src={iconPath} />;

		return null;
	}

	/**
	 * Resolve the icon to use based on the title
	 * of the terminal passed in the props.
	 *
	 * @returns The path to the icon or undefined if none match
	 */
	private getIcon(): UndefinedObject<string> {

		let icon;

		if(this.props.title.startsWith('vim'))
			icon = 'vim';

		return icon ? this.toIconPath(icon) : undefined;
	}

	/**
	 * Resolve the path to an icon with its name.
	 * They should be placed in the static root
	 * directory of the project.
	 *
	 * @param icon - The name of the icon
	 * @returns The path to this icon
	 */
	private toIconPath(icon: string): string {

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return path.join(__static, `/icons/${icon}.svg`);
	}
}
