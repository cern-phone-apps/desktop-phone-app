import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Grid, Icon, Item} from 'semantic-ui-react'
import MakeCallButtonContainer from 'calls/containers/components/MakeCallButton/MakeCallButtonContainer'
import {buildRecipient} from 'calls/utils'

class RecentCall extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    incoming: PropTypes.bool.isRequired,
    missed: PropTypes.bool.isRequired
  }

  setRecipient = () => {
    const recipient = {
      name: this.props.name,
      phoneNumber: this.props.phoneNumber,
      startTime: this.props.startTime,
      incoming: false,
      missed: false
    }

    return buildRecipient(recipient)
  }

  render () {
    let contentWidth = 13
    let unreadWidth = 3
    const color = this.props.missed ? 'red' : 'green'

    const printableDate = moment(this.props.startTime).calendar()
    const duration = moment.duration(moment(this.props.endTime).diff(moment(this.props.startTime)))

    return (
      <Item className={'padded-item'}>
        <Icon
          name='user'
          size={'large'}
          color={'grey'}
          className={'ui avatar'}/>

        <Item.Content>
          <Grid
            verticalAlign={'middle'}
            relaxed={false}
            padded={false}>
            <Grid.Column width={contentWidth}>
              <Item.Header>{this.props.name} {this.props.phoneNumber ? `(${this.props.phoneNumber})` : ''}</Item.Header>
              <Item.Description>{
                this.props.incoming
                  ? <Icon name={'arrow down'} color={color}/>
                  : <Icon name={'arrow up'} color={color}/>
              }
              <span className='date'>{printableDate} - {duration.humanize()}</span>
              </Item.Description>
            </Grid.Column>
            <Grid.Column width={unreadWidth}>
              <MakeCallButtonContainer recipient={this.setRecipient()} name={this.props.name} phoneNumber={this.props.phoneNumber}/>
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
    )
  }
}

export default RecentCall
