import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'

import './LeftColumnHeader.css'
import ToggleButtonContainer from 'common/containers/components/ToggleButton/ToggleButtonContainer'
import StatusSwitcherContainer from 'calls/containers/components/StatusSwitcher/StatusSwitcherContainer'


class LeftColumnHeader extends Component {

  render () {
    return (
      <header className="padded-item column-header left-header">
        <Grid>
          <Grid.Column width={8}>
            <ToggleButtonContainer/>
          </Grid.Column>
          <Grid.Column width={8} textAlign={'right'} className={'right-sub-column LeftColumnHeader'}>
            <StatusSwitcherContainer />
          </Grid.Column>
        </Grid>
      </header>
    )
  }
}

export default LeftColumnHeader
