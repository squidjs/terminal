import React from 'react';
import { render } from 'react-dom';
import App from '@ui/App';
import ConfigContext from '@ui/contexts/ConfigContext';
import AuthContext from '@ui/contexts/AuthContext';
import BlocksProvider from '@ui/contexts/NotificationsContext';
import WindowsProvider from '@ui/contexts/WindowsContext';
import HostsContext from '@ui/contexts/HostsContext';

if(module.hot)
    module.hot.accept();

const root = document.getElementById('app');

render(
    <BlocksProvider>
        <ConfigContext>
            <HostsContext>
                <AuthContext>
                    <WindowsProvider>
                        <App />
                    </WindowsProvider>
                </AuthContext>
            </HostsContext>
        </ConfigContext>
    </BlocksProvider>, root);
