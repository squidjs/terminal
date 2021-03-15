import { INotification } from '@app/notifications/notification';

// All the differents providers availables
export type Providers =
    INotification;

// A provider is a callback which contains the object to provide and
// dispatch the action.
export type Provider<T extends Providers> = (provider: T) => void;
