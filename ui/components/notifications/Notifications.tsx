import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { updateNotification } from '@app/notifications/notification';
import Notification from '@ui/components/notifications/Notification';
import { ipcRenderer } from 'electron';
import { IUpdateStatus } from '@common/types/types';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';
import '@ui/styles/notifications.scss';

const Notifications: FC = (): ReactElement => {

    const { notifications, dispatch } = useContext(NotificationsContext);

    /**
     * Listen for updates coming from the main process
     * to show them as notifications. We also send back
     * to the main process when the user want to restart
     * to apply the update.
     */
    useEffect(() => {

        // The callback executed to restart the app
        const restart = () => ipcRenderer.send('restart');

        ipcRenderer.on('update', (_, update: IUpdateStatus) => {

            const notification = updateNotification(update, restart);
            dispatch({ type: 'ADD', notification });
        });
    }, []);

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
