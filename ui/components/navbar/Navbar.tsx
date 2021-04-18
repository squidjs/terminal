import React, { CSSProperties, FC, ReactElement, useContext } from 'react';
import Tabs from '@ui/components/tabs/Tabs';
import AuthButton from '@ui/components/navbar/buttons/SettingsButton';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import NavbarButton from '@ui/components/navbar/buttons/NavbarButton';
import { remote } from 'electron';
import { isMac } from '@common/utils/utils';
import ButtonSeparator from '@ui/components/navbar/ButtonSeparator';
import '@ui/styles/navbar.scss';

const Navbar: FC = (): ReactElement => {

    const { theme } = useContext(ConfigContext);
    let className = 'navbar';

    if(isMac)
        className += ' mac';

    const toggleMaximize = () => {

        if(remote.getCurrentWindow().isMaximized())
            remote.getCurrentWindow().unmaximize();
        else
            remote.getCurrentWindow().maximize();
    };

    return (
        <div
            onDoubleClick={toggleMaximize} 
            className={className}
            style={{ '--border': theme.border } as CSSProperties }
        >
            <Tabs />
            <div className="buttons">
                <NavbarButton
                    onClick={() => remote.getCurrentWindow().webContents.send('menu')}
                    icon="mdi-settings" />
                <AuthButton />
                {
                    !isMac &&
                    <>
                        <ButtonSeparator />
                        <NavbarButton onClick={() => remote.getCurrentWindow().minimize()} icon="mdi-window_minimize" />
                        <NavbarButton onClick={toggleMaximize} icon="mdi-window_restore" />
                        <NavbarButton onClick={() => remote.getCurrentWindow().close()} icon="mdi-window_close" />
                    </>
                }
            </div>
        </div>
    );
}

export default Navbar;

