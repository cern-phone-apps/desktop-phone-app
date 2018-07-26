import {Component} from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import {Icon, Dropdown} from 'semantic-ui-react'


export function IconModalTrigger({iconColor}) {
  return <Icon name='user' color={iconColor}/>
}

export const statuses = {
  invisible: 'invisible',
  available: 'available',
  doNotDisturb: 'do_not_disturb'
}

export class StatusDropdown extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
    setUserAvailable: PropTypes.func.isRequired,
    setUserDoNotDisturb: PropTypes.func.isRequired,
    setUserInvisible: PropTypes.func.isRequired
  }

  state = {
    iconColor: 'green'
  }

  componentDidMount () {
    this.handleIconChange(this.props)
  }

  handleIconChange (props) {
    if (props.status === statuses.invisible) {
      this.setState({
        iconColor: 'grey'
      })
    }
    if (props.status === statuses.available) {
      this.setState({
        iconColor: 'green'
      })
    }
    if (props.status === statuses.doNotDisturb) {
      this.setState({
        iconColor: 'red'
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    this.handleIconChange(nextProps)
  }

  render () {
    return (
      <Dropdown trigger={IconModalTrigger(this.state)} floating className={'StatusSwitcher'}>
        <Dropdown.Menu className='left'>
          <Dropdown.Item onClick={this.props.setUserAvailable}>
            <Icon name={'circle'} color={'green'}/> {'Available'}</Dropdown.Item>
          <Dropdown.Item onClick={this.props.setUserDoNotDisturb}>
            <Icon name={'circle'} color={'red'}/> {'Do not disturb'}
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.setUserInvisible}>
            <Icon name={'circle'} color={'grey'}/> {'Invisible'}
          </Dropdown.Item>
          <Dropdown.Item onClick={this.props.disconnect}>
            <Icon name={'circle'} color={'black'}/> {'Disconnect'}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default StatusDropdown