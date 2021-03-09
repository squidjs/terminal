import React, { CSSProperties, FC, ReactElement, useContext } from 'react';
import Tabs from '@ui/components/tabs/Tabs';
import AuthButton from '@ui/components/navbar/buttons/SettingsButton';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import NavbarButton from '@ui/components/navbar/buttons/NavbarButton';
import { remote } from 'electron';
import { isMac } from '@common/utils/utils';
import '@ui/styles/navbar.scss';

const Navbar: FC = (): ReactElement => {

    const { theme } = useContext(ConfigContext);
    let className = 'navbar';

    if(isMac)
        className += ' mac';

    return (
        <div className={className} style={{ '--border': theme.border } as CSSProperties }>
            <Tabs />
            <div className="buttons">
                <NavbarButton
                    onClick={() => remote.getCurrentWindow().webContents.send('menu')}
                    icon="mdi-settings" />
                <AuthButton />
            </div>
        </div>
    );
}

export default Navbar;

