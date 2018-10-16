import React, {Component} from 'react'
import {Grid, Header, Responsive} from 'semantic-ui-react'

import './LeftColumnHeader.css'
import ToggleButtonContainer from 'common/containers/components/ToggleButton/ToggleButtonContainer'
import ColumnHeader from 'common/components/ColumnHeader/ColumnHeader'
import ConnectionStatusIconContainer from 'calls/containers/components/ConnectionStatusIcon/ConnectionStatusIconContainer'
import ErrorMessageContainer from 'common/containers/components/ErrorMessage/ErrorMessageContainer'

class LeftColumnHeader extends Component {
  render () {
    const {title} = this.props || ''

    return (
      <ColumnHeader>
        <Grid.Row>
          <Grid.Column textAlign={'left'} width={4}>
            <ToggleButtonContainer/>
          </Grid.Column>
          <Grid.Column style={this.centerColumnStyles} textAlign={'center'} width={8}>
            <Header as={'h4'}>{title} <Responsive as={ErrorMessageContainer} {...Responsive.onlyMobile}/>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign={'right'} width={4}>
            <ConnectionStatusIconContainer/>
          </Grid.Column>
        </Grid.Row>
      </ColumnHeader>
    )
  }
}

export default LeftColumnHeader
