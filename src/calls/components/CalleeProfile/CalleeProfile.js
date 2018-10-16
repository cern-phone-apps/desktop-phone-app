import React, {Component} from 'react'
import {Header, Icon, Loader, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import CalleeProfileNumberContainer from 'calls/containers/components/CalleeProfile/CalleeProfileNumberContainer'

export function ProfileInfo ({profile}) {
  const division = profile.division === '[]' ? '' : profile.division
  const group = profile.cernGroup === '[]' ? '' : `-${profile.cernGroup}`
  const section = profile.cernSection === '[]' ? '' : `-${profile.cernSection}`
  return (
    <Segment attached>
      <Header as='h3'>
        <Icon name='user' color={'blue'}/>
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
    fetching: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    unSelectUser: PropTypes.func.isRequired
  }

  getItems = () => {
    const {profile} = this.props
    if (!profile || !profile.phones) {
      return []
    }
    return profile.phones.map((phone, index) => (
      <CalleeProfileNumberContainer
        key={`number-${index}`}
        phoneNumber={phone.number}
        recipientName={profile.displayName}
        icon={phone.phoneType}/>
    ))
  }

  render () {
    const {fetching, profile} = this.props
    if (fetching) {
      return <Loader size={'large'}/>
    }

    return (
      <Segment basic>
        <ProfileInfo {...this.props}/>
        {this.getItems().map((phone, index) => (
        <CalleeProfileNumberContainer
          key={`number-${index}`}
          phoneNumber={phone.number}
          recipientName={profile.displayName}
          icon={phone.phoneType}/>
        ))}
      </Segment>
    )
  }
}

export default CalleeProfile
