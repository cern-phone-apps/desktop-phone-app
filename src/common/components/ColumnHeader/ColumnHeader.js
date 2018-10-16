import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'

import './ColumnHeader.css'

class ColumnHeader extends Component {
  render () {
    return (
      <header className="padded-item column-header">
        <Grid>
          {this.props.children}
        </Grid>
      </header>
    )
  }
}

export default ColumnHeader
