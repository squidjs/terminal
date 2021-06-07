import { INotification, INotificationLevel } from '@app/notifications/notification';
import { CSSProperties, useContext, useEffect } from 'react';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';
import { ITheme } from '@common/config/Config';

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

const useNotification = (notification: INotification) => {

    const { dispatch } = useContext(NotificationsContext);

    /**
     * Remove the notification when the configured time has passed.
     */
    useEffect(() => {

        // The timeout of this notification in milliseconds
        const timeout = notification.time * 1000;

        setTimeout(() => dispatch({ type: 'REMOVE', notification }), timeout);

    }, []);

    const notificationStyle = ({ level }: INotification, theme: ITheme): CSSProperties => ({ backgroundColor: getColor(level, theme) });
    const contentStyle = ({ black: color }: ITheme): CSSProperties => ({ color });

    return {
        notificationStyle,
        contentStyle,
    };
}

export default useNotification;
