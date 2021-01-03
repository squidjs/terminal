import React, { Component } from 'react';
import { INotification } from '../../../common/notifications/notification';
import Notification from './Notification';
import { AppState } from '../../../app/store/types';
import { connect } from 'react-redux';
import { IConfig } from '../../../common/config/Config';
import '../../styles/notifications.scss';

interface Props {

	config: IConfig;
	notifications: INotification[];
}

const mapStateToProps = (state: AppState) => ({

	notifications: state.notifications,
});


class Notifications extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	render() {

		return (
			<div className="notifications">
				{
					this.props.notifications.map((notification) => {

						return <Notification config={this.props.config} key={notification.content} notification={notification} />
					})
				}
			</div>
		);
	}
}

export default connect(mapStateToProps)(Notifications);
