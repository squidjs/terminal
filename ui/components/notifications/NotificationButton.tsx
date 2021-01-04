import React, { Component, CSSProperties } from 'react';
import { ITheme } from '@common/config/Config';
import { INotificationButton } from '@common/notifications/notification';

interface Props {

	theme: ITheme;
	button: INotificationButton;
}

export default class NotificationButton extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		const { theme, button } = this.props;

		const buttonStyle: CSSProperties = { backgroundColor: theme.background, color: theme.foreground };

		return <button
					className="button"
					style={buttonStyle}
					onClick={button.onClick}
					type="button">{ button.title }</button>;
	}
}
