import filter from 'lodash/filter'
import omit from 'lodash/omit'
import uid from 'uid'

import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from 'common/actions/notifications';

export default function Notifications(state = [], action) {
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return [
        ...state,
        { ...omit(action, 'type'), uid: uid(10) }
      ];
    case HIDE_NOTIFICATION:
      return filter(state, notification => {
        return notification.uid !== action.uid;
      });
    default:
      return state
  }
}