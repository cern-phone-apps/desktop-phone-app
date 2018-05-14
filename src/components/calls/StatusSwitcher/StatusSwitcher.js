import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dropdown, Icon} from 'semantic-ui-react'

const trigger = ({iconColor}) => (
  <Icon name='user' color={iconColor}/>
)

class StatusSwitcher extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    setUserAvailable: PropTypes.func.isRequired,
    setUserDoNotDisturb: PropTypes.func.isRequired,
    setUserInvisible: PropTypes.func.isRequired,
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  state = {
    iconColor: 'green'
  }

  componentWillMount () {
    console.debug('componentWillMount')

    this.handleIconChange(this.props)
  }

  handleIconChange (props) {
    if (props.status === 'invisible') {
      this.setState({
        iconColor: 'grey'
      })
    }
    if (props.status === 'available') {
      this.setState({
        iconColor: 'green'
      })
    }
    if (props.status === 'do_not_disturb') {
      this.setState({
        iconColor: 'red'
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    console.debug('componentWillReceiveProps')

    this.handleIconChange(nextProps)
  }

  connect = () => {
    console.debug('connect')
    this.props.phoneService.connectAgent()
  }

  render () {
    if (!this.props.connected) {
      return (
        <Button as={'a'} className={'flat ToggleButton'} icon={'plug'} onClick={this.connect}/>
      )
    }

    return (
      <Dropdown trigger={trigger(this.state)} floating className={'status-dropdown'}>
        <Dropdown.Menu className='left'>
          <Dropdown.Item onClick={this.props.setUserAvailable}>
            <Icon name={'circle'} color={'green'}/> {'Available'}</Dropdown.Item>
          <Dropdown.Item onClick={this.props.setUserDoNotDisturb}>
            <Icon name={'circle'} color={'red'}/> {'Do not disturb'}
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.setUserInvisible}>
            <Icon name={'circle'} color={'grey'}/> {'Invisible'}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default StatusSwitcher
