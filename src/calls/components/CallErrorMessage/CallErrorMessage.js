import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Message, Segment} from 'semantic-ui-react'

export class CallErrorMessage extends Component {
  static propTypes = {
    connectionError: PropTypes.object,
    callError: PropTypes.object,
    numbersError: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  styles = {
    margin: 0,
    padding: '0 0 1em 0'
  }

  render () {
    const {t, callError, connectionError, numbersError} = this.props

    let results = []

    if (callError && callError.statusCode) {
      results.push(callError)
    }
    if (connectionError && connectionError.statusCode) {
      results.push(connectionError)
    }

    if (numbersError && numbersError.statusCode) {
      results.push(numbersError)
    }

    if(results.length < 1){
      return ''
    }
    return (
      <Segment textAlign={'center'} basic style={this.styles}>
        {results.map((element, index) => {
          return <Message color='red' key={`message${index}`}>{element.message} ({element.statusCode})</Message>
        })}
      </Segment>
    )
  }
}

export default translate('calls')(CallErrorMessage)