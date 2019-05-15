import React, { Component } from "react";
import { Grid, Search } from "semantic-ui-react";
import SearchProfileModalContainer from "calls/components/search/SearchProfileModal/SearchProfileModalContainer";
import _ from "lodash";
import {UserSearchUtils, UserSearchResultsFormatter} from "../utils"

export class UserSearchForm extends Component {
  state = {
    timeout: 0,
    value: "",
    results: [],
    searchResults: [],
    isLoading: false
  };

  handleResultSelect = (e, { result }) => {
    const { selectUser } = this.props;
    this.setState({
      value: result.title
    });
    selectUser(this.state.searchResults[result.id]);
  };

  handleSearchChange = (e, { value }) => {
    const { searchUsers } = this.props;

    this.setState({ isLoading: true, value });

    setTimeout(async () => {
      // If there is no input value, the component must be cleared
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      if (this.state.value.length > 3) {
        const result = await UserSearchUtils.searchUsersAndFormatResults(
          this.state.value,
          searchUsers,
          UserSearchResultsFormatter.formatResults
        );
        this.setState(result);
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
