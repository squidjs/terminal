import React, { FC, ReactElement, useEffect, useState, createContext } from 'react';
import Config, { IConfig } from '@common/config/Config';
import { defaultConfig } from '@common/config/defaultConfig';
import { configReloadedNotification } from '@common/notifications/notification';
import { addNotification } from '@app/store/notifications/actions';
import { NotificationsAction, SelectedAction } from '@app/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props {

    children: ReactElement;
    dispatch: (action: NotificationsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: SelectedAction) => { dispatch(action) } }
}

export const ConfigContext = createContext<IConfig>(defaultConfig);

const ConfigProvider: FC<Props> = ({ children, dispatch }: Props): ReactElement => {

    const [config, setConfig] = useState<IConfig>(defaultConfig);

    // Load the config on mount
    useEffect(() => {

        const config = Config.getInstance().loadConfig((config) => {

            // Add a notification when config is reloaded
            const notification = configReloadedNotification(false);
            dispatch(addNotification(notification));

            setConfig(config);
        });

        setConfig(config);

    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}

export default connect(mapDispatchToProps)(ConfigProvider);
