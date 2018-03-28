import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './RightColumn.css'

class RightColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className={'RightColumn'}>
        {this.props.children}
      </div>
    )
  }
}

export default RightColumn
