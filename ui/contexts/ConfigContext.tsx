import React, { FC, ReactElement, useEffect, useState, createContext, useContext } from 'react';
import Config, { IConfig } from '@common/config/Config';
import { defaultConfig } from '@common/config/defaultConfig';
import { configReloadedNotification } from '@app/notifications/notification';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';

interface Props {

    children: ReactElement;
}

export const ConfigContext = createContext<IConfig>(defaultConfig);

const ConfigProvider: FC<Props> = ({ children }: Props): ReactElement => {

    const { dispatch } = useContext(NotificationsContext);
    const [config, setConfig] = useState<IConfig>(defaultConfig);

    // Load the config on mount
    useEffect(() => {

        const config = Config.getInstance().loadConfig((config) => {

            // Add a notification when config is reloaded
            const notification = configReloadedNotification(config === undefined);
            dispatch({ type: 'ADD', notification });

            if(config)
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

export default ConfigProvider;
