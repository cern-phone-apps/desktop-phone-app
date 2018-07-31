import React, {Component} from 'react'
import {Header, Icon, Loader, Menu, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import CalleeProfileNumberContainer from 'calls/containers/components/CalleeProfile/CalleeProfileNumberContainer'

export function ProfileInfo ({profile}) {
  const division = profile.division === '[]' ? '' : profile.division
  const group = profile.cernGroup === '[]' ? '' : `-${profile.cernGroup}`
  const section = profile.cernSection === '[]' ? '' : `-${profile.cernSection}`
  return (
    <Segment attached>
      <Header as='h3'>
        <Icon name='user'/>
        <Header.Content>
          {profile.displayName}
          <Header.Subheader>{division}{group}{section}</Header.Subheader>
        </Header.Content>
      </Header>

      <ul>
        <li>
          <Icon name={'mail'}/> {profile.mail}
        </li>
        <li>
          <Icon name={'pin'}/> {profile.physicalDeliveryOfficeName}
        </li>
      </ul>
    </Segment>
  )
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
}

export class CalleeProfile extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getUserProfile(this.props.username)
  }

  getItems = () => {
    const {profile} = this.props
    if (!profile) {
      return []
    }
    return profile.phones && profile.phones.map((phone, index) => (
      <CalleeProfileNumberContainer
        key={`number-${index}`}
        phoneNumber={phone.number}
        recipientName={profile.displayName}
        icon={phone.phoneType}/>
    ))
  }

  render () {
    const {fetching} = this.props
    if (fetching) {
      return <Loader size={'large'}/>
    }

    return (
      <div>
        <ProfileInfo {...this.props}/>
        <div>
          <Menu fluid={true} attached={'bottom'} vertical={true} items={this.getItems()}/>
        </div>
      </div>
    )
  }
}

export default CalleeProfile
