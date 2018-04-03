import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Button, Grid, Icon, Item} from 'semantic-ui-react'

class RecentCall extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    incoming: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    missed: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    makeCall: PropTypes.func.isRequired
  }

  makeCall = (number) => {
    console.log(`Event target: ${number}`)
    console.debug(this.props)
    this.props.makeCall({
      name: 'Test User',
      number: '123456 7890',
      startTime: Date.now()
    })
  }

  render () {
    let contentWidth = 13
    let unreadWidth = 3
    const color = this.props.missed ? 'red' : 'green'

    const printableDate = moment(this.props.timestamp).calendar()
    return (
      <Item className={'padded-item'}>
        <img src={this.props.image} alt={'avatar'} className={'ui avatar image'}/>

        <Item.Content>
          <Grid verticalAlign={'middle'} relaxed={false} padded={false}>
            <Grid.Column width={contentWidth}>
              <Item.Header>{this.props.author}</Item.Header>
              <Item.Description>{
                this.props.incoming
                  ? <Icon name={'arrow down'} color={color}/>
                  : <Icon name={'arrow up'} color={color}/>
              }
              <span className='date'>{printableDate}</span>
              </Item.Description>
            </Grid.Column>
            <Grid.Column width={unreadWidth}>
              <Button
                className={'flat'}
                icon={'phone'}
                disabled={(this.props.onCall || this.props.calling)}
                onClick={this.makeCall}/>
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
    )
  }
}

export default RecentCall
