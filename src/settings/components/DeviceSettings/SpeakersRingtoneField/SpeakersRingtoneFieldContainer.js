import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SpeakersRingtoneField from 'settings/components/DeviceSettings/SpeakersRingtoneField/SpeakersRingtoneField';
import { setSpeakerRingtone } from 'settings/actions/devices';

function mapStateToProps({ settings }) {
  return {
    outputDevice: settings.devices ? settings.devices.speaker : undefined
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSpeakerRingtone
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakersRingtoneField);
