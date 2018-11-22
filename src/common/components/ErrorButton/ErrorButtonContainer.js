import { connect } from "react-redux";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import ErrorButton from "common/components/ErrorButton/ErrorButton";

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

export default phoneService(ErrorButtonContainer);