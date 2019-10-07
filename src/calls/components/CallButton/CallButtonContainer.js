import { connect } from 'react-redux';
import { CallButtonElement } from './CallButton';

function mapStateToProps({ settings }) {
  const { devices } = settings;
  return {
    devices
  };
}

export const CallButton = connect(mapStateToProps)(CallButtonElement);

export default CallButton;
