import { connect } from 'react-redux';
import { CallButtonElement } from './CallButtonElement';

function mapStateToProps({ settings }) {
  const { devices } = settings;
  return {
    devices
  };
}

export const CallButton = connect(mapStateToProps)(CallButtonElement);

export default CallButton;
