import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Loader} from 'semantic-ui-react'

const ButtonNumbersList = (props) => {
  console.debug(props)
  if (props.numbers === undefined || props.numbers === []) {
    return ''
  }
  return (<div>
    {props.numbers.map((item, index) => {
      return (
        <Button fluid key={`number-${index}`}
                onClick={() => props.connect(item.phoneNumber)}>
          <Icon name='plug'/>
          {item.phoneNumber}</Button>
      )
    })
    }
  </div>)
}

class ConnectNumberButton extends Component {
  static propTypes = {
    connecting: PropTypes.bool.isRequired,
    numbers: PropTypes.array.isRequired,
    getUserPhoneNumbers: PropTypes.func.isRequired,
    setActiveNumber: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getUserPhoneNumbers()
  }

  connect = (activeNumber) => {
    console.debug('connect')
    this.props.setActiveNumber(activeNumber)
    this.props.phoneService.connectAgent()
  }

  render () {
    if (!this.props.connecting || !this.props.numbers) {
      return <ButtonNumbersList numbers={this.props.numbers} connect={this.connect}/>
    } else {
      return <Loader active inline='centered'/>
    }
  }
}


export default ConnectNumberButton
