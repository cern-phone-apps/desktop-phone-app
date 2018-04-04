import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './UserSearch.css'

class UserSearch extends Component {
  static propTypes = {
    userSelected: PropTypes.bool.isRequired,
    value: PropTypes.string,
    selectUser: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    updateSearchValue: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired
  }

  state = {
    timeout: 0,
    activeItem: 'inbox'

  }

  componentWillMount () {
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
    this.props.selectUser()
    this.props.updateSearchValue(result.title)
  }
  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true})
    this.props.updateSearchValue(value)

    if (this.state.timeout) clearTimeout(this.state.timeout)
    this.setState({
      timeout: setTimeout(() => {
        if (!this.props.value || this.props.value.length < 1) {
          this.props.unSelectUser()
          return this.resetComponent()
        }
        if (this.props.value && this.props.value.length > 3) {
          this.props.searchUsers(value).then(() => {
            this.setState({
              isLoading: false
            })
            this.props.unSelectUser()
          })
        }
      }, 300)
    })
  }

  render () {
    const {isLoading} = this.state
    console.debug(this.state)
    console.debug(this.props)
    return (
      <Search
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
