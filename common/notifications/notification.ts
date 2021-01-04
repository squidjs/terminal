import { IUpdateStatus } from '@common/types/types';

export interface INotification {

	/**
	 * The title of this notification.
	 */
	title: string;
	/**
	 * The content which describe what this notification
	 * is about.
	 */
	content: string;
	/**
	 * The length of this notification in seconds.
	 */
	time: number;
	/**
	 * Optional button to add to the notification.
	 */
	button?: INotificationButton;
	/**
	 * The level of this notification, used to find
	 * the color.
	 */
	level: INotificationLevel;
}

export interface INotificationButton {

	/**
	 * The title of this button.
	 */
	title: string;
	/**
	 * A callback called when the user clicked
	 * on the button.
	 */
	onClick: () => void;
}

export enum INotificationLevel {

	INFO,
	SUCCESS,
	ERROR,
}

/**
 * Build a notification for the font size.
 *
 * @param fontSize - The new font size to notify for
 * @returns The notification to show
 */
export const fontSizeNotification = (fontSize: number): INotification => ({

	title: 'Font size',
	content: `Set font size to ${fontSize}px.`,
	time: 2,
	level: INotificationLevel.INFO,
});

/**
 * Build a notification for the config reloading.
 *
 * @param error - If there is an error while reloading the config
 * @returns The notification to show
 */
export const configReloadedNotification = (error: boolean): INotification => ({

	title: 'Config',
	content: error ? 'Could not load configuration.' : 'Configuration reloaded',
	time: 3,
	level: error ? INotificationLevel.ERROR : INotificationLevel.SUCCESS,
});

/**
 * Build a notification for the updater with a button to restart the app
 * to apply the downloaded update.
 *
 * @param update - The update status
 * @param onClick - Callback when the user clicked on the button
 * @returns The notification to show
 */
export const updateNotification = (update: IUpdateStatus, onClick: () => void): INotification => ({

	title: 'Update',
	content: update.readyToInstall ? 'Update downloaded. Restart now?' : 'New update available, downloading...',
	time: 5,
	button: update.readyToInstall ? {

		title: 'Restart',
		onClick,

	} : undefined,
	level: update.readyToInstall ? INotificationLevel.SUCCESS : INotificationLevel.INFO,
});
