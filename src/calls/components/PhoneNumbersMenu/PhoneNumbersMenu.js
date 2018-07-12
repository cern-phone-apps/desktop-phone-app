import React, {Component} from 'react'
import {Header, Icon, Loader, Menu, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {PhoneNumberMenuItemContainer} from 'calls/containers/components'
import {getUserProfile} from 'calls/api'

class PhoneNumbersMenu extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired
  }

  state = {
    profile: undefined
  }

  componentDidMount () {
    // TODO Make call to retrieve the user profile: /users/<USERNAME>
    this.initProfile().then(()=> {})
  }

  initProfile = async () => {
    this.setState(() => ({profile: null}))

    const profile = await getUserProfile(this.props.username)
    this.setState(() => ({profile}));
  }

  render () {

    const {profile} = this.state

    if (profile === undefined || !profile) {
      return <Loader size={'large'}/>
    }

    if (profile) {

      const division = profile.division === '[]' ? '' : profile.division
      const group = profile.cernGroup === '[]' ? '' : `-${profile.cernGroup}`
      const section = profile.cernSection === '[]' ? '' : `-${profile.cernSection}`

      return (
        <div>
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
          <Menu fluid={true} attached={'bottom'} vertical={true}>
            {profile.phones && profile.phones.map((phone, index) => (
              <PhoneNumberMenuItemContainer
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

PhoneNumbersMenu.propTypes = {}

export default PhoneNumbersMenu
