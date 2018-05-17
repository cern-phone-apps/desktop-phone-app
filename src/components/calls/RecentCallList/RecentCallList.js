import React, {Component} from 'react'
import faker from 'faker'
import PropTypes from 'prop-types'

import {Item} from 'semantic-ui-react'
import {ScrollableContent} from 'components/common'
import RecentCall from '../RecentCall/RecentCall'

/**
 * Displays a scrollable list of RecentCall
 */
class RecentCallList extends Component {
  static propTypes = {
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    makeCall: PropTypes.func.isRequired
  }
  render () {
    return (
      <ScrollableContent>
        <Item.Group>
          {[...Array(10).keys()].map((index) => {
            return (
              <RecentCall
                key={index}
                author={faker.name.findName()}
                incoming={faker.random.boolean()}
                image={faker.image.imageUrl()}
                missed={faker.random.boolean()}
                onCall={this.props.onCall}
                calling={this.props.calling}
                makeCall={this.props.makeCall}
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
