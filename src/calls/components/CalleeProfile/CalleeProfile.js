import React, {Component} from 'react'
import {Header, Icon, Loader, Menu, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {CalleeProfileNumberContainer} from 'calls/containers/components'

const ProfileInfo = ({profile}) => {
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


class CalleeProfile extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    getUserProfile: PropTypes.func.isRequired
  }

  state = {
    profile: undefined
  }

  componentDidMount () {
    this.props.getUserProfile(this.props.username)
  }

  render () {

    const {profile, fetching} = this.props
    console.log(this.props)

    if (fetching) {
      return <Loader size={'large'}/>
    }

    if (profile) {
      return (
        <div>
          <ProfileInfo {...this.props}/>
          <Menu fluid={true} attached={'bottom'} vertical={true}>
            {profile.phones && profile.phones.map((phone, index) => (
              <CalleeProfileNumberContainer
                key={`number-${index}`}
                phoneNumber={phone.number}
                recipientName={profile.displayName}
                icon={phone.phoneType}/>
            ))}
          </Menu>
        </div>
      )
    }
  }
}

CalleeProfile.propTypes = {}

export default CalleeProfile
