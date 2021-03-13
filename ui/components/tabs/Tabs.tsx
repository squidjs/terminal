import React, { FC, ReactElement, useContext } from 'react';
import Tab from '@ui/components/tabs/tab/Tab';
import TabCreateTerminal from '@ui/components/tabs/TabCreateTerminal';
import { WindowsContext } from '@ui/contexts/WindowsContext';
import '@ui/styles/tabs.scss';
import '@ui/styles/nerdfonts.min.css';

const Tabs: FC = (): ReactElement => {

    const { windows } = useContext(WindowsContext);

    return (
        <div className="tabs">
            {
                windows.map((window) =>
                    <Tab
                        key={window.id}
                        window={window} />
                )
            }
            <TabCreateTerminal />
        </div>
    );
}

export default Tabs;
