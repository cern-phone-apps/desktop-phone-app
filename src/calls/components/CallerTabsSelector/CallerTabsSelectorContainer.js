import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import CallerTabsSelector from 'calls/components/CallerTabsSelector/CallerTabsSelector';

function mapStateToProps({ dialpad }) {
  return {
    dialpadValue: dialpad.value,
    displayDialpad: dialpad.display
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export const CallerTabsSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerTabsSelector);

export default CallerTabsSelectorContainer;
