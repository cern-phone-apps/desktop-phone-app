import { connect } from 'react-redux'
import {PersonalInfo} from 'settings/components'

function mapStateToProps ({user}) {
  return {
    username: user.me.username,
    firstName: user.me.firstName,
    lastName: user.me.lastName,
    email: user.me.email
  }
}

export default connect(
  mapStateToProps,
  null
)(PersonalInfo)
