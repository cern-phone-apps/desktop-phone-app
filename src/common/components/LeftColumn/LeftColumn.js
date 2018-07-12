import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './LeftColumn.css'

class LeftColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className={'LeftColumn'}>
        {this.props.children}
      </div>
    )
  }
}

export default LeftColumn
