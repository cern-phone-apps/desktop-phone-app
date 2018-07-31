import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Item} from 'semantic-ui-react'
import RecentCall from 'calls/components/RecentCallList/RecentCall'
import ScrollableContent from 'common/components/ScrollableContent/ScrollableContent'

/**
 * Displays a scrollable list of RecentCall Components
 */
class RecentCallList extends Component {
  static propTypes = {
    recentCalls: PropTypes.array.isRequired
  }

  render () {
    return (
      <ScrollableContent>
        <Item.Group>
          {this.props.recentCalls.map((item, index) => {
            return (
              <RecentCall
                key={`recent-${index}`}
                author={item.author}
                phoneNumber={item.phoneNumber}
                incoming={item.incoming}
                missed={item.missed}
                startTime={item.startTime}
                endTime={item.endTime}
              />
            )
          })
          }
        </Item.Group>
      </ScrollableContent>
    )
  }
}

export default RecentCallList
