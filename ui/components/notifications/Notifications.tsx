import React, { FC, ReactElement, useEffect } from 'react';
import { INotification, updateNotification } from '@common/notifications/notification';
import Notification from '@ui/components/notifications/Notification';
import { AppState, NotificationsAction } from '@app/store/types';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { IUpdateStatus } from '@common/types/types';
import { Dispatch } from 'redux'
import { addNotification } from '@app/store/notifications/actions';
import '@ui/styles/notifications.scss';

interface Props {

    notifications: INotification[];
    dispatch: (action: NotificationsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: NotificationsAction) => { dispatch(action) } }
}

const Notifications: FC<Props> = ({ notifications, dispatch }: Props): ReactElement => {

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
            dispatch(addNotification(notification));
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
