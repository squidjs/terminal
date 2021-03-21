import React, { ReactElement, FC } from 'react';
import { IWindow } from '@app/Terminal';
import ResolverProvider from '@common/resolvers/ResolverProvider';
import IconResolverProvider, { IconResolverType } from '@app/resolvers/icon/IconResolverProvider';
import { callTrigger } from '@common/packages/packages';
import { TabIconParam } from '@common/packages/package';

interface Props {

    window: IWindow;
}

// The resolver to use
const resolver: ResolverProvider<IWindow, IconResolverType> = new IconResolverProvider();

const TabIcon: FC<Props> = ({ window }: Props): ReactElement | null => {

    const { icon } = callTrigger('hookTabIcon', {
        window,
        icon: resolver.resolve(window),
    } as TabIconParam);

    // Only render the icon if it's actually defined
    if(!icon)
        return null;

    const [iconPath, color, customIcon] = icon;

    if(customIcon)
        return (
            <i className='icon nf' style={{ color }}>{ iconPath }</i>
        );

    return (
        <i className={`icon nf ${iconPath}`} style={{ color }} />
    );
}

export default TabIcon;

