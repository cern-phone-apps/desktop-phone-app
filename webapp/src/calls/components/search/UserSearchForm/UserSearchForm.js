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

  handleResultSelect = (e, { result }) => {
    const { selectUser } = this.props;
    const { searchResults } = this.state;

    this.setState({
      value: result.title
    });
    selectUser(searchResults[result.id]);
  };

  handleSearchChange = (e, { value }) => {
    const { searchUsers } = this.props;
    this.setState({ isLoading: true, value });

    setTimeout(async () => {
      // If there is no input value, the component must be cleared
      if (value.length < 1) {
        return this.resetComponent();
      }

      if (value.length > 3) {
        const result = await UserSearchUtils.searchUsersAndFormatResults(
          value,
          searchUsers,
          UserSearchResultsFormatter.formatResults
        );
        this.setState(result);
      }
    }, 300);
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
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
          />
          <SearchProfileModalContainer />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default UserSearchForm;
