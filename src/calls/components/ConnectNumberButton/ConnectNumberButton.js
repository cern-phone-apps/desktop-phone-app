import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Loader} from 'semantic-ui-react'

const ButtonNumbersList = ({numbers, phoneNumber, connect}) => {
  if (numbers === undefined || numbers === []) {
    return ''
  }
  return (<div>
    {numbers.map((item, index) => {
      return (
        <Button fluid key={`number-${index}`}
          onClick={() => connect(phoneNumber)}>
          <Icon name='plug'/>
          {phoneNumber}</Button>
      )
    })
    }
  </div>)
}

ButtonNumbersList.propTypes = {
  numbers: PropTypes.array.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  connect: PropTypes.func.isRequired
}

class ConnectNumberButton extends Component {
  static propTypes = {
    connecting: PropTypes.bool.isRequired,
    numbers: PropTypes.array.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    getUserPhoneNumbers: PropTypes.func.isRequired,
    setActiveNumber: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getUserPhoneNumbers()
  }

  connect = (activeNumber) => {
    this.props.setActiveNumber(activeNumber)
    this.props.phoneService.connectAgent()
  }

  render () {
    const {connecting, numbers, phoneNumber} = this.props
    if (!connecting || !numbers) {
      return <ButtonNumbersList numbers={numbers} phoneNumber={phoneNumber} connect={this.connect}/>
    } else {
      return <Loader active inline='centered'/>
    }
  }
}

export default ConnectNumberButton
