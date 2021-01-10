import React, { ReactElement, FC } from 'react';
import { IWindow } from '@app/Terminal';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import IconResolverProvider, { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';

interface Props {

    window: IWindow;
}

// The resolver to use
const resolver: ResolverProvider<IWindow, IconResolverType> = new IconResolverProvider();

const TabIcon: FC<Props> = ({ window }: Props): ReactElement | null => {

    const icon = resolver.resolve(window);

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

