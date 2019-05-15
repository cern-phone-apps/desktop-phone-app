import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ToggleButton from "common/components/ToggleButton/ToggleButton";
import {
  displaySidebar,
  finishedDisplayingSidebar
} from "common/actions/sidebar";

function mapStateToProps({ common }) {
  return {
    isVisible: common.sidebar.isVisible,
    displayTime: common.sidebar.displayTime
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      displaySidebar,
      finishedDisplayingSidebar
    },
    dispatch
  );
}

const ToggleButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleButton);

export default ToggleButtonContainer;
