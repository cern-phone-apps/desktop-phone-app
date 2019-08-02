import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchProfileModal } from 'calls/components/search/SearchProfileModal/SearchProfileModal';
import { searchActions } from 'dial-core';

function mapStateToProps({ search }) {
  return {
    userSelected: search.userSelected,
    user: search.user
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
