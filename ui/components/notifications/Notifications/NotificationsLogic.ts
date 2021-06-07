import { useContext, useEffect } from 'react';
import { NotificationsContext } from '@ui/contexts/NotificationsContext';
import { ipcRenderer } from 'electron';
import { IUpdateStatus } from '@common/types/types';
import { updateNotification } from '@app/notifications/notification';

const useNotifications = () => {

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

    return notifications;
}

export default useNotifications;
