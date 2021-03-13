import React, { CSSProperties, FC, ReactElement, useContext, useEffect } from 'react';
import { ITheme } from '@common/config/Config';
import { INotification, INotificationLevel } from '@app/notifications/notification';
import NotificationButton from '@ui/components/notifications/NotificationButton';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';

interface Props {

    notification: INotification;
}

const Notification: FC<Props> = ({ notification }: Props): ReactElement => {

    const { theme } = useContext(ConfigContext);
    const { dispatch } = useContext(NotificationsContext);

    /**
     * Remove the notification when the configurated time has passed.
     */
    useEffect(() => {

        // The timeout of this notification in milliseconds
        const timeout = notification.time * 1000;

        setTimeout(() => dispatch({ type: 'REMOVE', notification }), timeout);

    }, []);

    const notificationStyle = ({ level }: INotification, theme: ITheme): CSSProperties => {

        return { backgroundColor: getColor(level, theme) };
    }

    const contentStyle = ({ black: color }: ITheme): CSSProperties => {

        return { color };
    }

    return (
        <div className="notification" style={notificationStyle(notification, theme)}>
            <p className="title" style={contentStyle(theme)}>{ notification.title }</p>
            <p className="content" style={contentStyle(theme)}>{ notification.content }</p>
            {
                notification.button &&
                <NotificationButton theme={theme} button={notification.button} />
            }
        </div>
    );
}

/**
 * Get the background color for this notification
 * based on the current theme.
 *
 * @param level - The notification leve
 * @param theme - The theme to use
 * @returns The background color
 */
const getColor = (level: INotificationLevel, theme: ITheme): string => {

    switch(level) {

        case INotificationLevel.INFO:
            return theme.brightBlue;

        case INotificationLevel.SUCCESS:
            return theme.brightGreen;

        case INotificationLevel.ERROR:
            return theme.brightRed;

        default:
            return '';
    }
}

export default Notification;
