import React, { Component, CSSProperties } from 'react';
import { IConfig, ITheme } from '@common/config/Config';
import { INotification, INotificationLevel } from '@common/notifications/notification';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NotificationsAction } from '@app/store/types';
import { removeNotification } from '@app/store/notifications/actions';
import NotificationButton from '@ui/components/notifications/NotificationButton';

interface Props {

    config: IConfig;
    notification: INotification;
    dispatch: (action: NotificationsAction) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return { dispatch: (action: NotificationsAction) => { dispatch(action) } }
}

class Notification extends Component<Props> {

    constructor(props: Props) {

        super(props);
    }

    /**
     * Remove the notification when the configurated time has passed.
     */
    componentDidMount() {

        // The timeout of this notification in milliseconds
        const timeout = this.props.notification.time * 1000;

        setTimeout(() => {

            this.props.dispatch(removeNotification(this.props.notification));

        }, timeout);
    }

    render() {

        const { theme } = this.props.config;
        const { notification } = this.props;

        const notificationStyle: CSSProperties = { backgroundColor: this.getColor(theme) };
        const contentStyle: CSSProperties = { color: theme.black };

        return (
            <div className="notification" style={notificationStyle}>
                <p className="title" style={contentStyle}>{ notification.title }</p>
                <p className="content" style={contentStyle}>{ notification.content }</p>
                {
                    notification.button &&
                        <NotificationButton theme={theme} button={notification.button} />
                }
            </div>
        );
    }

    /**
     * Get the backgorund color for this notification
     * based on the current theme.
     *
     * @param theme - The theme to use
     * @returns The background color
     */
    private getColor(theme: ITheme): string {

        switch(this.props.notification.level) {

            case INotificationLevel.INFO:
                return theme.brightBlue;

            case INotificationLevel.SUCCESS:
                return theme.brightGreen;

            case INotificationLevel.ERROR:
                return theme.brightRed;

            default:
                return '';
        }
    }
}

export default connect(mapDispatchToProps)(Notification);
