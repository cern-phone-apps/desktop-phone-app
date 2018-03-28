import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'

import './LeftColumnHeader.css'
import {ToggleButtonContainer} from 'containers/sidebar'

class LeftColumnHeader extends Component {
  render () {
    return (
      <header className="padded-item column-header left-header">
        <Grid>
          <Grid.Column width={8}>
            <ToggleButtonContainer/>
          </Grid.Column>
          <Grid.Column width={8} textAlign={'right'} className={'right-sub-column'}>
            Right side
          </Grid.Column>
        </Grid>
      </header>
    )
  }
}

LeftColumnHeader.propTypes = {}

export default LeftColumnHeader
