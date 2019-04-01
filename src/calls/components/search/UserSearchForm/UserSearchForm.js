import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import UserSearchResultsListContainer from "calls/components/search/UserSearchResultsList/UserSearchResultsListContainer";

export class UserSearchForm extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { onSubmit, onChange, value, enableSearch } = this.props;
    const secondColumn = {
      flex: 1,
      overflowY: "scroll",
      marginBottom: "10px",
      maxHeight: "100vh"
    };
    return (
      <div>
        {this.renderSearchFieldRow(onSubmit, enableSearch, value, onChange)}
        {this.renderSearchResultsRow()}
      </div>
    );
  }

  renderSearchResultsRow() {
    const {searchResults} = this.props;
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <UserSearchResultsListContainer searchResults={searchResults} />
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderSearchFieldRow(onSubmit, enableSearch, value, onChange) {
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
}
