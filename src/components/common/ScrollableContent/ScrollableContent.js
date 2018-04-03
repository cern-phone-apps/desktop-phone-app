import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ScrollableContent.css'

class ScrollableContent extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render () {
    return (
      <div className={'ScrollableContent'}>
        {this.props.children}
      </div>
    )
  }
}

export default ScrollableContent
