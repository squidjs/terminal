import React, { FC, ReactElement, createContext, useReducer, Reducer } from 'react';
import { NotificationsContextType } from '@app/store/notifications/types';
import { INotification } from '@app/notifications/notification';
import { notificationsReducer } from '@app/store/notifications/reducers/NotificationsReducer';
import { NotificationsActions } from '@app/store/notifications/actions/NotificationsActions';

const defaultState: NotificationsContextType = {

    notifications: [],
    dispatch: (_: NotificationsActions) => null,
}

export const NotificationsContext = createContext<NotificationsContextType>(defaultState);

const NotificationsProvider: FC = ({ children }): ReactElement => {

    const [notifications, dispatch] = useReducer<Reducer<INotification[], NotificationsActions>>(notificationsReducer, []);

    return (
        <NotificationsContext.Provider value={{ notifications, dispatch }}>
            { children }
        </NotificationsContext.Provider>
    );
}

export default NotificationsProvider;
