import { connect } from 'react-redux';
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import ErrorMessage from 'common/components/ErrorMessage/ErrorMessage';

function mapStateToProps({ call, connection, numbers, auth }) {
  return {
    errors: [call.error, connection.error, numbers.error, auth.error]
  };
}

export const ConnectedErrorMessageContainer = connect(
  mapStateToProps,
  null
)(ErrorMessage);

export default withPhoneService(ConnectedErrorMessageContainer);
