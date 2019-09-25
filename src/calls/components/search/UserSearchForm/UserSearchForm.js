import React, { Component } from 'react';
import { Grid, Search } from 'semantic-ui-react';
import SearchProfileModalContainer from 'calls/components/search/SearchProfileModal/SearchProfileModalContainer';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { UserSearchUtils, UserSearchResultsFormatter } from '../utils';

export class UserSearchForm extends Component {
  static propTypes = {
    selectUser: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired
  };

  state = {
    value: '',
    results: [],
    searchResults: [],
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.searchUsersDebounced = _.debounce(this.searchUsersDebounced, 500);
  }

  handleResultSelect = (e, { result }) => {
    const { selectUser } = this.props;
    const { searchResults } = this.state;

    this.setState({
      value: result.title
    });
    selectUser(searchResults[result.id]);
  };

  searchUsersDebounced = async value => {
    const { searchUsers } = this.props;

    const result = await UserSearchUtils.searchUsersAndFormatResults(
      value,
      searchUsers,
      UserSearchResultsFormatter.formatResults
    );
    this.setState(result);
    return result;
  };

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value });
    if (value.length < 1) {
      return this.resetComponent();
    }
    if (value.length > 3) {
      this.searchUsersDebounced(value);
    }
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Search
            fluid
            input={{ fluid: true }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            aria-label={"Search bar"}
          />
          <SearchProfileModalContainer />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserSearchForm;
