import React, {Component} from 'react'
import {Button, Grid, Header} from 'semantic-ui-react'

import './RightColumnHeader.css'
import ColumnHeader from 'common/components/ColumnHeader/ColumnHeader'
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer'

class RightColumnHeader extends Component {

  centerColumnStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  }

  render () {

    const {title} = this.props

    return (
      <ColumnHeader>
        <Grid.Row>
          <Grid.Column textAlign={'left'} width={3}>
            <Button as={'a'} className={'flat'} icon={'info'}/>
          </Grid.Column>
          <Grid.Column style={this.centerColumnStyles} textAlign={'center'} width={10}>
            <Header as={'h4'}>{title} <ErrorMessageContainer/>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign={'right'} width={3}>
            <Button as={'a'} className={'flat'} icon={'info'}/>
          </Grid.Column>
        </Grid.Row>
        {/*<Grid.Column width={5}>*/}
        {/*<Button as={'a'} className={'flat'} icon={'info'}/>*/}
        {/*</Grid.Column>*/}
        {/*<Grid.Column width={6} textAlign={'center'} className={'right-sub-column RightColumnHeader'}>*/}
        {/*<Header as={'h4'}>You are disconnected</Header>*/}
        {/*</Grid.Column>*/}
        {/*<Grid.Column width={5} textAlign={'right'} className={'right-sub-column RightColumnHeader'}>*/}
        {/*<Button as={'a'} className={'flat'} icon={'info'}/>*/}
        {/*</Grid.Column>*/}
      </ColumnHeader>
    )
  }
}

export default RightColumnHeader
