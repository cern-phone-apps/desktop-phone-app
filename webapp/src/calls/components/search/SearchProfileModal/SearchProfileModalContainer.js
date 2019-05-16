import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchProfileModal } from 'calls/components/search/SearchProfileModal/SearchProfileModal';
import { searchActions } from 'dial-core';

function mapStateToProps({ calls }) {
  return {
    userSelected: calls.search.userSelected,
    user: calls.search.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectUser: searchActions.unSelectUser
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProfileModal);
