import { connect } from "react-redux";
import OnCallDetails from "calls/components/OnCallDetails/OnCallDetails";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";

function mapStateToProps({ calls }) {
  return {
    recipient: calls.call.recipient
  };
}

export const OnCallDetailsContainer = connect(
  mapStateToProps,
  null
)(OnCallDetails);

export default phoneService(OnCallDetailsContainer);
