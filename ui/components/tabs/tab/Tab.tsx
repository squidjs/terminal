import React, { CSSProperties, FC, ReactElement } from 'react';
import { IWindow } from '@app/Terminal'
import TabIcon from '@ui/components/tabs/TabIcon/TabIcon';
import useTab from '@ui/components/tabs/Tab/TabLogic';

interface Props {

    window: IWindow;
}

const Tab: FC<Props> = ({ window }: Props): ReactElement => {

    const {
        config,
        selectWindow,
        deleteWindow,
        contextMenu,
        tabTitleClass,
    } = useTab(window);

    return (
        <div
            className="tab"
            onClick={selectWindow}
            onContextMenu={contextMenu}
            style={{ '--border': config.theme.border, '--color': config.theme.text, '--hover': config.theme.textHover } as CSSProperties}>
            {
                config.tabsIcons &&
                <TabIcon window={window} />
            }
            <button
                type="button"
                className={tabTitleClass}>{window.name}</button>
            <button
                type="button"
                className="tab-close"
                onClick={deleteWindow}>x</button>
        </div>
    );
}

export default Tab;
