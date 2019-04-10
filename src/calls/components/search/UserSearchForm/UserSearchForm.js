import React, { Component } from "react";
import { Grid, Search } from "semantic-ui-react";
import { logMessage } from "common/utils/logs";
import SearchProfileModalContainer from "calls/components/search/SearchProfileModal/SearchProfileModalContainer";
import _ from "lodash";
import { formatUserOrganization } from "calls/utils/formatters";

export class UserSearchForm extends Component {
  state = {
    timeout: 0,
    value: "",
    results: [],
    searchResults: [],
    isLoading: false
  };

  formatResultsForSearch = results => {
    const formattedResults = results.map((result, index) => {
      return {
        id: index,
        title: result.displayName,
        description: `${formatUserOrganization(result)} - ${result.username}`
      };
    });
    logMessage(formattedResults);
    return formattedResults;

  };

  makeSearch = value => {
    const { searchUsers } = this.props;
    searchUsers(value).then(result => {
      this.setState({
        isLoading: false
      });
      if (result && !result.error) {
        this.setState({
          results: this.formatResultsForSearch(result.payload.result),
          searchResults: result.payload.result
        });
      }
    });
  };

  handleResultSelect = (e, { result }) => {
    const { selectUser } = this.props;
    this.setState({
      value: result.title
    });
    selectUser(this.state.searchResults[result.id]);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      // If there is no input value, the component must be cleared
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      if (this.state.value.length > 3) {
        this.makeSearch(this.state.value);
      }
    }, 300);
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

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
