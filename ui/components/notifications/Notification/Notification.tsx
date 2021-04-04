import React, { FC, ReactElement, useContext } from 'react';
import { INotification } from '@app/notifications/notification';
import NotificationButton from '@ui/components/notifications/NotificationButton';
import { ConfigContext } from '@ui/contexts/ConfigContext';
import useNotification from '@ui/components/notifications/Notification/NotificationLogic';

interface Props {

    notification: INotification;
}

const Notification: FC<Props> = ({ notification }: Props): ReactElement => {

    const { theme } = useContext(ConfigContext);
    const { notificationStyle, contentStyle } = useNotification(notification);

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

export default Notification;
