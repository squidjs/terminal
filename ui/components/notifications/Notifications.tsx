import React, { Component } from 'react';
import { INotification, updateNotification } from '../../../common/notifications/notification';
import Notification from './Notification';
import { AppState, NotificationsAction } from '../../../app/store/types';
import { connect } from 'react-redux';
import { IConfig } from '../../../common/config/Config';
import { ipcRenderer } from 'electron';
import { IUpdateStatus } from '../../../common/types/types';
import { Dispatch } from 'redux'
import { addNotification } from '../../../app/store/notifications/actions';
import '../../styles/notifications.scss';

interface Props {

	config: IConfig;
	notifications: INotification[];
	dispatch: (action: NotificationsAction) => void;
}

const mapStateToProps = (state: AppState) => ({

	notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => {

	return { dispatch: (action: NotificationsAction) => { dispatch(action) } }
}

class Notifications extends Component<Props> {

	constructor(props: Props) {

		super(props);
	}

	/**
	 * Listen for updates coming from the main process
	 * to show them as notifications.
	 */
	componentDidMount() {

		ipcRenderer.on('update', (event, update: IUpdateStatus) => {

			const notification = updateNotification(update); 
			this.props.dispatch(addNotification(notification));	
		});
	}

	render() {

		return (
			<div className="notifications">
				{
					this.props.notifications.map((notification, index) => {

						return <Notification config={this.props.config} key={index} notification={notification} />
					})
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
