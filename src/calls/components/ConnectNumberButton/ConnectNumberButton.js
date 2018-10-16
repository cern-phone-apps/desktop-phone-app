import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Loader, Segment} from 'semantic-ui-react'
import {logMessage} from 'common/utils'

const ButtonNumbersList = ({numbers, phoneNumber, connect}) => {
  if (numbers === undefined || numbers === []) {
    return ''
  }
  return (<div>
    {numbers.map((item, index) => {
      return (
        <Button fluid key={`number-${index}`}
          onClick={() => connect(item.phoneNumber)}>
          <Icon name='plug'/>
          {item.phoneNumber}</Button>
      )
    })
    }
  </div>)
}

ButtonNumbersList.propTypes = {
  numbers: PropTypes.array,
  phoneNumber: PropTypes.string,
  connect: PropTypes.func.isRequired
}

class ConnectNumberButton extends Component {
  static propTypes = {
    connecting: PropTypes.bool.isRequired,
    numbers: PropTypes.array,
    error: PropTypes.object,
    phoneNumber: PropTypes.string,
    getUserPhoneNumbers: PropTypes.func.isRequired,
    setActiveNumber: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getUserPhoneNumbers()
  }

  connect = (activeNumber) => {
    this.props.setActiveNumber(activeNumber)
    const result = this.props.phoneService.authenticateUser(activeNumber, activeNumber)
    logMessage(result)
  }

  render () {
    const {connecting, numbers, phoneNumber} = this.props

    if (connecting) {
      return (
        <Segment basic textAlign={'center'}>
          <Loader active inline='centered' content='Connecting...'/>
        </Segment>
      )
    }

    return <ButtonNumbersList numbers={numbers} phoneNumber={phoneNumber} connect={this.connect}/>
  }
}

export default ConnectNumberButton
