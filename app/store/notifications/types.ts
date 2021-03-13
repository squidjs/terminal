import { INotification } from '@app/notifications/notification';
import { NotificationsActions } from '@app/store/notifications/actions/NotificationsActions';

export type NotificationsContextType = {

    notifications: INotification[];
    dispatch: (action: NotificationsActions) => void;
}
