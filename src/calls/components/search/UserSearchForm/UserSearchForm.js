import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import UserSearchResultsListContainer from "calls/components/search/UserSearchResultsList/UserSearchResultsListContainer";
import { errorMessage, logMessage } from "common/utils/logs";
import SearchProfileModalContainer from "calls/components/search/SearchProfileModal/SearchProfileModalContainer";

export class UserSearchForm extends Component {

  state = {
    timeout: 0,
    searchValue: "",
    searchResults: []
  };

  shouldEnableSearch = () => {
    const { searchValue } = this.state;
    logMessage(`Should enable search? ${searchValue}: ${searchValue !== ""}`);
    return searchValue !== "";
  };

  componentDidMount() {
    this.shouldEnableSearch();
  }

  componentWillUnmount() {
    this.setState({ searchResults: [] });
  }

  makeSearch = () => {
    const { searchUsers } = this.props;
    const { searchValue } = this.state;

    searchUsers(searchValue).then(result => {
      this.setState({
        isLoading: false
      });
      errorMessage(result.payload.result);
      if (!result.error) {
        this.setState({
          searchResults: result.payload.result
        });
      }
    });
  };

  async _handleSearchTimeout(value) {
    logMessage("Calling set timeout");
    await this.setState({
      searchValue: value
    });
    if (value && value.length > 3) {
      this.makeSearch();
    }
  }

  removeSearchResults = () => {
    const { searchValue } = this.state;

    if (searchValue !== "") {
      this.setState({ searchResults: [] });
    }
  };

  handleSearchChange = (e, { name, value }) => {
    const { timeout } = this.state;

    this.setState({ [name]: value });
    this.shouldEnableSearch();
    this.removeSearchResults();

    if (timeout) {
      logMessage("Clearing timeout");
      clearTimeout(timeout);
    }

    this.setState({
      timeout: setTimeout(() => {
        this._handleSearchTimeout(value);
      }, 300)
    });
  };

  handleSubmit = () => {
    this.makeSearch();
  };

  render() {
    const shouldEnableSearch = this.shouldEnableSearch();
    return (
      <div>
        <SearchFieldRow
          onSubmit={this.handleSubmit}
          enableSearch={shouldEnableSearch}
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
        <SearchResultsRow searchResults={this.state.searchResults} />
        <SearchProfileModalContainer />
      </div>
    );
  }
}

function SearchResultsRow({ searchResults }) {
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <UserSearchResultsListContainer searchResults={searchResults} />
      </Grid.Column>
    </Grid.Row>
  );
}

function SearchFieldRow({ onSubmit, enableSearch, value, onChange }) {
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Field width={16}>
              <Input
                icon={
                  <Icon
                    onClick={onSubmit}
                    disabled={!enableSearch}
                    link={enableSearch}
                    name="search"
                    inverted
                    color={"blue"}
                    circular
                    className={"SearchUserButton"}
                  />
                }
                placeholder="Search for a person..."
                name={"searchValue"}
                value={value}
                onChange={onChange}
                className={"UserSearchInput"}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid.Column>
    </Grid.Row>
  );
}
