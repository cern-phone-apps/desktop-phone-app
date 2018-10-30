import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as devicesActionCreators from 'settings/actions/devices'
import SpeakersField from 'settings/components/DeviceSettings/SpeakersField'

function mapStateToProps ({devices}) {
  return {
    outputDevice: devices.speaker
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(devicesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakersField)
