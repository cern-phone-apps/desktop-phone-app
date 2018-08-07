import each from 'lodash/each'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {hide} from 'common/actions/notifications'
import NotifySystem from 'react-notification-system'

class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.array
  }

  system () {
    return this.refs.notify
  }

  componentWillReceiveProps (nextProps) {
    const {notifications} = nextProps

    each(notifications, notification => {
      this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(hide(notification.uid))
        }
      })
    })
  }

  shouldComponentUpdate (nextProps) {
    return this.props !== nextProps
  }

  render () {
    return (
      <NotifySystem ref="notify" />
    )
  }
}

Notifications.contextTypes = {
  store: PropTypes.object
}

export default connect(
  ({common}) => ({ notifications: common.notifications })
)(Notifications)
