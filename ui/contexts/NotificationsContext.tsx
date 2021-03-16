import React, { FC, ReactElement, createContext, useReducer, Reducer, useEffect } from 'react';
import { NotificationsContextType } from '@app/store/notifications/types';
import { INotification } from '@app/notifications/notification';
import { notificationsReducer } from '@app/store/notifications/reducers/NotificationsReducer';
import { NotificationsActions } from '@app/store/notifications/actions/NotificationsActions';
import { callTrigger } from '@common/plugins/plugins';
import { Provider } from '@common/plugins/providers';

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

    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, dispatch }}>
            { children }
        </NotificationsContext.Provider>
    );
}

export default NotificationsProvider;
