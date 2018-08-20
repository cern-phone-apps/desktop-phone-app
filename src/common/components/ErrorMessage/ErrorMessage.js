import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Message, Segment} from 'semantic-ui-react'

export class ErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.array,
    t: PropTypes.func.isRequired
  }

  styles = {
    margin: 0,
    padding: '0 0 1em 0'
  }

  render () {
    const {errors} = this.props

    let results = errors.filter((error) => (error && error.statusCode))

    if (results.length < 1) {
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

export default translate('calls')(ErrorMessage)
