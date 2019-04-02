import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import CallerTabsSelector from "calls/components/CallerTabsSelector/CallerTabsSelector";

function mapStateToProps({ calls }) {
  return {
    dialpadValue: calls.dialpad.value,
    displayDialpad: calls.dialpad.display,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  );
}

export const CallerTabsSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerTabsSelector);

export default CallerTabsSelectorContainer;
