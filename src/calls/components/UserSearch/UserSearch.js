import React, {Component} from 'react'
import {Form, Search} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {logMessage} from 'common/utils'

import './UserSearch.css'

class UserSearch extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    displayDialpad: PropTypes.bool.isRequired,
    userSelected: PropTypes.bool.isRequired,
    value: PropTypes.string,
    selectUser: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    updateSearchValue: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
  }

  state = {
    timeout: 0,
    activeItem: 'inbox'

  }

  componentDidMount () {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: []})
    this.props.updateSearchValue('')
    this.setState({
      isLoading: false
    })
  }
  handleResultSelect = (e, {result}) => {
    this.props.selectUser(result)
    this.props.updateSearchValue(result.title)
  }
  handleSearchChange = (e, {value}) => {
    logMessage('Handle search change')
    this.setState({isLoading: true})
    this.props.updateSearchValue(value)

    if (this.state.timeout) {
      logMessage('Clearing timeout')
      clearTimeout(this.state.timeout)
    }
    this.setState({
      timeout: setTimeout(() => {
        this._handleSearchTimeout(value)
      }, 300)
    })
  }

  _handleSearchTimeout (value) {
    logMessage('Calling set timeout')
    if (!this.props.value || this.props.value.length < 1) {
      this.props.unSelectUser()
      this.resetComponent()
    }
    if (this.props.value && this.props.value.length > 3) {
      this.props.searchUsers(value).then(() => {
        this.setState({
          isLoading: false
        })
        this.props.unSelectUser()
      })
    }
  }

  handleChange = (event) => {
    this.props.updateSearchValue(event.target.value)
  }

  render () {
    const {isLoading} = this.state

    if (this.props.displayDialpad) {
      return (
        <Form>
          <Form.Field>
            <input
              className={'DialPadInput'}
              type={'text'}
              value={this.props.value}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      )
    }

    return (
      <Search
        className={'UserSearch'}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={this.props.results}
        value={this.props.value}
        fluid={true}
        input={{icon: 'search', iconPosition: 'left', fluid: true}}
      />
    )
  }
}

export default UserSearch
