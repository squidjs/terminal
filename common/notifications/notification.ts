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
	 * The level of this notification, used to find
	 * the color.
	 */
	level: INotificationLevel;
}

export enum INotificationLevel {

	INFO,
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
	time: 3,
	level: INotificationLevel.INFO,
});
