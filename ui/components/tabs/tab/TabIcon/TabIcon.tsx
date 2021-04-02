import React, { ReactElement, FC } from 'react';
import { IWindow } from '@app/Terminal';
import useTabIcon from '@ui/components/tabs/tab/TabIcon/TabIconLogic';

interface Props {

    window: IWindow;
}

const TabIcon: FC<Props> = ({ window }: Props): ReactElement | null => {

    const icon = useTabIcon(window);

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

