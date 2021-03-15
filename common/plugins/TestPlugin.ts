import { Plugin } from '@common/plugins/plugin';
import { Provider } from '@common/plugins/features/providers';
import { INotification, INotificationLevel } from '@app/notifications/notification';

let provideNotification: Provider<INotification>;

const HelloWorld: Plugin = {

    hookConfig: (options) => {

        if(options.process === 'main')
            return options;

        setTimeout(() => {

            provideNotification({
                time: 3,
                title: 'Test notification',
                content: 'Hello notification provider',
                level: INotificationLevel.INFO,
            });

        }, 5000);

        return options;
    },
    provideNotifications: (options) => {

        provideNotification = options;
    }
}

export default HelloWorld;
