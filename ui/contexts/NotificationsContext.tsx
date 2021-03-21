import React, { FC, ReactElement, createContext, useReducer, Reducer, useEffect } from 'react';
import { NotificationsContextType } from '@app/store/notifications/types';
import { INotification } from '@app/notifications/notification';
import { notificationsReducer } from '@app/store/notifications/reducers/NotificationsReducer';
import { NotificationsActions } from '@app/store/notifications/actions/NotificationsActions';
import { callTrigger } from '@common/packages/packages';
import { Provider } from '@common/packages/providers';
import { ipcRenderer } from 'electron';

interface Props {

    children: ReactElement;
}

const defaultState: NotificationsContextType = {

    notifications: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_: NotificationsActions) => null,
}

export const NotificationsContext = createContext<NotificationsContextType>(defaultState);

const NotificationsProvider: FC<Props> = ({ children }: Props): ReactElement => {

    const [notifications, dispatch] = useReducer<Reducer<INotification[], NotificationsActions>>(notificationsReducer, []);

    // Setup the notifications provider on first mount
    useEffect(() => {

        const notificationProvider: Provider<INotification> = (notification: INotification) => {

            dispatch({ type: 'ADD', notification });
        }

        callTrigger('provideNotifications', notificationProvider);

        ipcRenderer.on('notification', (event, notification: INotification) => {

            notificationProvider(notification);
        });

    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, dispatch }}>
            { children }
        </NotificationsContext.Provider>
    );
}

export default NotificationsProvider;
