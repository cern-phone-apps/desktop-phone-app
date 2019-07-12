import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { searchActions } from 'dial-core';

import { UserSearchForm } from 'calls/components/search/UserSearchForm/UserSearchForm';

import dialBackendApi from 'services/api';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser: searchActions.selectUser,
      searchUsers: dialBackendApi.searchUsers
    },
    dispatch
  );
}

export const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchForm);

export default UserSearchFormContainer;
