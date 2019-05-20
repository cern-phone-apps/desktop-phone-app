import PropTypes from 'prop-types';
import { ToastAndroid } from 'react-native';

/* eslint-disable import/prefer-default-export */
export const Toast = ({ visible, message, duration }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid[duration],
      ToastAndroid.BOTTOM,
      0,
      50
    );
  }
  return null;
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  /** SHORT or LONG */
  duration: PropTypes.string
};

Toast.defaultProps = {
  visible: true,
  duration: 'LONG'
};
