import React, { CSSProperties, FC, ReactElement } from 'react';
import { ITheme } from '@common/config/Config';
import { INotificationButton } from '@common/notifications/notification';

interface Props {

	theme: ITheme;
	button: INotificationButton;
}

const NotificationButton: FC<Props> = ({ theme, button }): ReactElement => {
	
	const buttonStyle: CSSProperties = { backgroundColor: theme.background, color: theme.foreground };

	return (
		<button
			className="button"
			style={buttonStyle}
			onClick={button.onClick}
			type="button">{ button.title }
		</button>
	);
}

export default NotificationButton;

