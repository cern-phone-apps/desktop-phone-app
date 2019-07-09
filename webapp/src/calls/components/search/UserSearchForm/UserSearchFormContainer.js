import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { searchActions, usersActionFactory } from 'dial-core';

import { UserSearchForm } from 'calls/components/search/UserSearchForm/UserSearchForm';

import config from 'config';

const apiEndpoint = config.api.ENDPOINT;

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser: searchActions.selectUser,
      searchUsers: usersActionFactory(apiEndpoint).searchUsers
    },
    dispatch
  );
}

export const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchForm);

export default UserSearchFormContainer;
