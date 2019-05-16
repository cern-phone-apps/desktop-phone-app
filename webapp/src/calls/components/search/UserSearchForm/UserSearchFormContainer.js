import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { searchActions, searchActionFactory } from 'dial-core';

import { UserSearchForm } from 'calls/components/search/UserSearchForm/UserSearchForm';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser: searchActions.selectUser,
      searchUsers: searchActionFactory(process.env.REACT_APP_API_ENDPOINT)
        .searchUsers
    },
    dispatch
  );
}

export const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchForm);

export default UserSearchFormContainer;
