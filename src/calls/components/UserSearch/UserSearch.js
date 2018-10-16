import React, {Component} from 'react'
import {Button, Form, Icon, Input, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {logMessage} from 'common/utils'

import './UserSearch.css'
import UserSearchResultsContainer from 'calls/containers/components/UserSearch/UserSearchResultsContainer'
import {CallerDialpadContainer} from 'calls/containers/components/Dialpad/DialpadContainer'

class UserSearchForm extends Component {
  render () {

    return <div style={this.props.style}>
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group inline>
          <Form.Field width={15}>
            <Input icon={<Icon onClick={this.props.onSubmit}
                               disabled={!this.props.enableSearch}
                               link={this.props.enableSearch}
                               name='search'
                               inverted
                               color={'blue'}
                               circular
            />}
                   placeholder='Search for a person...'
                   name={'searchValue'}
                   value={this.props.value}
                   onChange={this.props.onChange}/>
          </Form.Field>
          <Form.Field width={1}>
            <Button type={'button'} icon={'text telephone'} circular onClick={this.props.onClick}/>
          </Form.Field>
        </Form.Group>
      </Form>
      {!this.props.onCall && !this.props.calling && <UserSearchResultsContainer/>}
    </div>
  }
}

UserSearchForm.propTypes = {
  style: PropTypes.shape({height: PropTypes.string, display: PropTypes.string, flexDirection: PropTypes.string}),
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.any,
  onCall: PropTypes.any,
  calling: PropTypes.any
}

class DialpadForm extends Component {
  render () {
    return <div>
      <Form>
        <Form.Group inline>
          <Form.Field width={15}>
            <Input
              className={'DialPadInput'}
              value={this.props.value}
              placeholder={'Input a number...'}
              onChange={this.props.onChange}
              icon={<Icon name='text telephone' inverted color={'blue'} circular/>}
            />
          </Form.Field>
          <Form.Field width={1}>
            <Button type={'button'} icon={'search'} circular onClick={this.props.onClick}/>
          </Form.Field>
        </Form.Group>
      </Form>
      {this.props.displayDialpad &&
      <Grid.Column>
        <CallerDialpadContainer/>
      </Grid.Column>}
    </div>
  }
}

DialpadForm.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.any,
  displayDialpad: PropTypes.bool
}

class UserSearch extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    displayDialpad: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    userSelected: PropTypes.bool.isRequired,
    dialpadValue: PropTypes.string,
    selectUser: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    updateDialpadValue: PropTypes.func.isRequired,
  }

  state = {
    timeout: 0,
    activeItem: 'inbox',
    searchValue: ''
  }


  shouldEnableSearch = () => {
    const {searchValue} = this.state
    logMessage(`Should enable search? ${searchValue}: ${searchValue !== ''}`)
    return searchValue !== '';
  }


  componentDidMount () {
    this.shouldEnableSearch()
  }

  _handleSearchTimeout (value) {
    logMessage('Calling set timeout')
    if (this.state.searchValue && this.state.searchValue.length > 3) {
      this.props.searchUsers(value).then(() => {
        this.setState({
          isLoading: false
        })
      })
    }
  }

  clearSearchResults = () => {
    const {searchValue} = this.state
    if(searchValue !== '') {
      this.props.clearSearchResults()
    }
  }

  handleSubmit = () => {
    const {searchValue} = this.state
    logMessage(`Starting the search: ${searchValue}`)
    this.props.searchUsers(searchValue).then((result) => {
      logMessage(result)
      this.setState({
        isLoading: false
      })
      this.props.unSelectUser()
    })

  }

  handleChange2 = (e, {name, value}) => {
    this.setState({[name]: value})
    this.shouldEnableSearch()
    this.clearSearchResults()

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

  handleChange = (event) => {
    this.props.updateDialpadValue(event.target.value)
  }

  wrapperStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }

  render () {
    const {searchValue} = this.state
    const {dialpadValue, onCall, calling, displayDialpad} = this.props
    const shouldEnableSearch = this.shouldEnableSearch()

    logMessage(`DialpadValue: ${dialpadValue}`)

    if (displayDialpad) {
      return (
        <DialpadForm value={dialpadValue} onChange={this.handleChange} onClick={this.props.displayDialpadAction}
                     displayDialpad={displayDialpad}/>
      )
    }

    return (
      <UserSearchForm style={this.wrapperStyle} enableSearch={shouldEnableSearch} onSubmit={this.handleSubmit}
                      value={searchValue}
                      onChange={this.handleChange2} onClick={this.props.displayDialpadAction} onCall={onCall}
                      calling={calling}/>
    )
  }
}

export default UserSearch
