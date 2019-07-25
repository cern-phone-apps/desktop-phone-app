import { connect } from 'react-redux';
import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';
import ErrorButton from 'common/components/ErrorButton/ErrorButton';

function mapStateToProps({ call, connection, numbers, auth }) {
  return {
    errors: [call.error, connection.error, numbers.error, auth.error]
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
