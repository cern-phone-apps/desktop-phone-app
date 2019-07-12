import { connect } from 'react-redux';
import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';
import ErrorButton from 'common/components/ErrorButton/ErrorButton';

function mapStateToProps({ calls, auth }) {
  return {
    errors: [
      calls.call.error,
      calls.connection.error,
      calls.numbers.error,
      auth.error
    ]
  };
}

export const ErrorButtonContainer = connect(
  mapStateToProps,
  null
)(ErrorButton);

export const ErrorButtonContainerWithPhoneService = withPhoneService(
  ErrorButtonContainer
);

export default ErrorButtonContainerWithPhoneService;
