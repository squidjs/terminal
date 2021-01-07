import React, { ReactElement, FC } from 'react';
import { UndefinedObject } from '@common/types/types';
import { ITerminal } from '@app/Terminal';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import IconResolverProvider, { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';

interface Props {

	terminal: ITerminal;
}

// The resolver to use
const resolver: ResolverProvider<ITerminal, IconResolverType> = new IconResolverProvider();

/**
 * Resolve the icon to use based on the title
 * of the terminal passed in the props.
 *
 * @param terminal - The terminal to use
 * @returns A tuple of the path to the icon and the color
 */
const getIcon = (terminal: ITerminal): UndefinedObject<IconResolverType> => {

	return resolver.resolve(terminal);
}

const TabIcon: FC<Props> = ({ terminal }): ReactElement | null => {

	const icon = getIcon(terminal);

	// Only render the icon if it's actually defined
	if(icon) {

		const [iconPath, color] = icon;
		
		return (
			<i className={`icon nf nf-${iconPath}`} style={{ color }} />
		);
	}

	return null;
}

export default TabIcon;

