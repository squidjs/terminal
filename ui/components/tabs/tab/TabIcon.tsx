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
    if(!icon)
        return null;

    const [iconPath, color, customIcon] = icon;

    if(customIcon)
        return (
            <i className='icon nf' style={{ color }}>{ iconPath }</i>
        );

    return (
        <i className={`icon nf nf-${iconPath}`} style={{ color }} />
    );
}

export default TabIcon;

