import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as authActionCreators from 'login/actions/auth'
import {LogoutButton} from 'login/components'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...authActionCreators
  }, dispatch)
}
//
// const mapStateToProps = (state) => ({
//   lastRolledNumber: state.lastRolledNumber
// });

// const mapDispatchToProps = (dispatch) => ({
//   onRollDice: () => dispatch({ type: 'ROLL_DICE' })
// });

export const LogoutButtonContainer = connect(
    null,
    mapDispatchToProps
  )(LogoutButton)


export default withRouter(LogoutButtonContainer)
