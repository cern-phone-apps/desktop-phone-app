import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dimmer, Dropdown, Header, Icon, Loader, Modal, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './StatusSwitcher.css'
import {callsRoute} from 'calls/routes'

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
    phoneService: PropTypes.object.isRequired,
    disconnecting: PropTypes.bool.isRequired
  }

  state = {
    iconColor: 'green'
  }

  componentDidMount () {
    console.debug('componentDidMount')

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

  disconnect = () => {
    console.debug('disconnect')
    this.props.phoneService.disconnectAgent()
  }

  render () {
    if (!this.props.connected) {
      return (
        <div className={'ToggleButtonContainer'}>
          <Button className={'flat ToggleButton'}>
            <Link to={callsRoute.path}><Icon name={'plug'}/></Link>
          </Button>
        </div>
      )
    }

    return (
      <div>
        <Dropdown trigger={trigger(this.state)} floating className={'StatusSwitcher'}>
          <Dropdown.Menu className='left'>
            <Dropdown.Item onClick={this.props.setUserAvailable}>
              <Icon name={'circle'} color={'green'}/> {'Available'}</Dropdown.Item>
            <Dropdown.Item onClick={this.props.setUserDoNotDisturb}>
              <Icon name={'circle'} color={'red'}/> {'Do not disturb'}
            </Dropdown.Item>
            <Dropdown.Item onClick={this.props.setUserInvisible}>
              <Icon name={'circle'} color={'grey'}/> {'Invisible'}
            </Dropdown.Item>
            <Dropdown.Item onClick={this.disconnect}>
              <Icon name={'circle'} color={'black'}/> {'Disconnect'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal size={'mini'} open={this.props.disconnecting}>
          <Modal.Content>
            <Modal.Description>
              <Header textAlign='center'>Disconnecting...</Header>
              <Segment basic>
                <Dimmer active inverted>
                  <Loader size='small'/>
                </Dimmer>
              </Segment>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default StatusSwitcher
