import React from 'react';
import { render } from 'react-dom';
import App from '@ui/App';
import { Provider } from 'react-redux';
import store from '@app/store/store';
import ConfigContext from '@ui/contexts/ConfigContext';
import AuthContext from '@ui/contexts/AuthContext';
import BlocksProvider from '@ui/contexts/NotificationsContext';
import WindowsProvider from '@ui/contexts/WindowsContext';

if(module.hot)
    module.hot.accept();

const root = document.getElementById('app');

render(
    <Provider store={store}>
        <BlocksProvider>
            <ConfigContext>
                <AuthContext>
                    <WindowsProvider>
                        <App />
                    </WindowsProvider>
                </AuthContext>
            </ConfigContext>
        </BlocksProvider>
    </Provider>, root);
