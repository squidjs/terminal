import React, { CSSProperties, FC, ReactElement, useContext, useEffect } from 'react';
import { ITheme } from '@common/config/Config';
import { INotification, INotificationLevel } from '@common/notifications/notification';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NotificationsAction } from '@app/store/types';
import { removeNotification } from '@app/store/notifications/actions';
import NotificationButton from '@ui/components/notifications/NotificationButton';
import { ConfigContext } from '@ui/contexts/ConfigContext';

interface Props {

    notification: INotification;
    dispatch: (action: NotificationsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: NotificationsAction) => { dispatch(action) } }
}

const Notification: FC<Props> = ({ notification, dispatch }: Props): ReactElement => {

    const { theme } = useContext(ConfigContext);

    /**
     * Remove the notification when the configurated time has passed.
     */
    useEffect(() => {

        // The timeout of this notification in milliseconds
        const timeout = notification.time * 1000;

        setTimeout(() => dispatch(removeNotification(notification)), timeout);

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

export default connect(mapDispatchToProps)(Notification);
