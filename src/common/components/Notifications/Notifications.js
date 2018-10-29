import each from "lodash/each";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hide } from "common/actions/notifications";
import NotifySystem from "react-notification-system";
import { logMessage } from "common/utils";

/**
 * Handles the application notifications
 */
class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.array
  };

  constructor() {
    super();
    this.notify = React.createRef();
  }

  system() {
    return this.notify;
  }

  componentDidUpdate(nextProps) {
    logMessage("Notifications component updated");
    const { notifications } = this.props;
    logMessage(notifications);

    each(notifications, notification => {
      this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(hide(notification.uid));
        }
      });
    });
  }

  render() {
    let notifyRef = el => (this.notify = el);
    return <NotifySystem ref={notifyRef} />;
  }
}

Notifications.contextTypes = {
  store: PropTypes.object
};

export default connect(({ common }) => ({
  notifications: common.notifications
}))(Notifications);
