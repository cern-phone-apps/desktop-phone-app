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
    console.log(result)
  }

  render () {
    const {connecting, numbers, phoneNumber, error} = this.props

    if (connecting) {
      return <Loader active inline='centered'/>
    }

    return <ButtonNumbersList numbers={numbers} phoneNumber={phoneNumber} connect={this.connect}/>
  }
}

export default ConnectNumberButton
