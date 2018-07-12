import {Component} from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import {Icon, Dropdown} from 'semantic-ui-react'


const IconModalTrigger = ({iconColor}) => (
  <Icon name='user' color={iconColor}/>
)

class StatusDropdown extends Component {

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