import React, { FC, ReactElement } from 'react';
import Notification from '@ui/components/notifications/Notification/Notification';
import useNotifications from '@ui/components/notifications/Notifications/NotificationsLogic';
import '@ui/styles/notifications.scss';

const Notifications: FC = (): ReactElement => {

    const notifications = useNotifications();

    return (
        <div className="notifications">
            {
                notifications.map((notification, index) => {

                    return <Notification key={index} notification={notification} />
                })
            }
        </div>
    );
}

export default Notifications;
