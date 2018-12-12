import { connect } from "react-redux";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import { bindActionCreators } from "redux";
import { getUserPhoneNumbers, setActiveNumber } from "calls/actions/numbers";
import NumberConnector from "./NumberConnector";

function mapStateToProps({ calls }) {
  return {
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserPhoneNumbers,
    setActiveNumber
  }, dispatch);
}

export const ConnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberConnector);

export default phoneService(ConnectNumberButtonContainer);
