import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Grid, Icon, Item} from 'semantic-ui-react'
import MakeCallButtonContainer from 'calls/containers/components/MakeCallButton/MakeCallButtonContainer'
import {buildRecipient} from 'calls/utils'

class RecentCall extends Component {
  static propTypes = {
    recentCall: PropTypes.object.isRequired,
    // phoneNumber: PropTypes.string.isRequired,
    // startTime: PropTypes.number.isRequired,
    // endTime: PropTypes.number.isRequired,
    // incoming: PropTypes.bool.isRequired,
    // missed: PropTypes.bool.isRequired
  }

  setRecipient = () => {
    const {name, phoneNumber, startTime} = this.props.recentCall
    const recipient = {
      name: name,
      phoneNumber: phoneNumber,
      startTime: startTime,
      incoming: false,
      missed: false
    }
    return buildRecipient(recipient)
  }

  render () {
    let contentWidth = 13
    let unreadWidth = 3
    const {name, phoneNumber, startTime, endTime, missed, incoming} = this.props.recentCall

    const color = missed ? 'red' : 'green'

    const printableDate = moment(startTime).calendar()
    const duration = moment.duration(moment(endTime).diff(moment(startTime)))

    return (
      <Item className={'padded-item'}>
        <Icon
          name='user'
          size={'large'}
          color={'blue'}
          className={'ui avatar'}/>

        <Item.Content>
          <Grid
            verticalAlign={'middle'}
            relaxed={false}
            padded={false}>
            <Grid.Column width={contentWidth}>
              <Item.Header>{name} {phoneNumber ? `(${phoneNumber})` : ''}</Item.Header>
              <Item.Description>{
                incoming
                  ? <Icon name={'arrow down'} color={color}/>
                  : <Icon name={'arrow up'} color={color}/>
              }
              <span className='date'>{printableDate} - {duration.humanize()}</span>
              </Item.Description>
            </Grid.Column>
            <Grid.Column width={unreadWidth}>
              <MakeCallButtonContainer recipient={this.setRecipient()} name={name} phoneNumber={phoneNumber}/>
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
    )
  }
}

export default RecentCall
