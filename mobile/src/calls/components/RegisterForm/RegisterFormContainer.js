import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { numbersActionFactory, numbersActions } from 'dial-core';

import { phoneService } from '../../providers/PhoneProvider/PhoneService';
import RegisterForm from './RegisterForm';

function mapStateToProps({ calls }) {
  return {
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setActiveNumber: numbersActions.setActiveNumber
    },
    dispatch
  );
}

export const RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

export default phoneService(RegisterFormContainer);
