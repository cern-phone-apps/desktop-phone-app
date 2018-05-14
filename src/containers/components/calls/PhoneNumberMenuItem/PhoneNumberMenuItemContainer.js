import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'actions/calls/call'
import * as searchActionCreators from 'actions/calls/search'
import PhoneNumberMenuItem from 'components/calls/PhoneNumbersMenu/PhoneNumberMenuItem'

function mapStateToProps ({calls}) {
  return {
    unSelectUser: calls.search.unSelectUser,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...searchActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberMenuItem)
