import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as callActionCreators from 'calls/actions/call'
import {PhoneNumbersMenu} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    username: calls.search.user.username
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumbersMenu))