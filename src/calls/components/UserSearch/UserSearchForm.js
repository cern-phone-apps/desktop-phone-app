import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import UserSearchResultsListContainer from "calls/components/UserSearch/UserSearchResultsListContainer";

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
      overflow: "auto",
      marginBottom: '10px'
    };
    return (
      <>
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
                      />
                    }
                    placeholder="Search for a person..."
                    name={"searchValue"}
                    value={value}
                    onChange={onChange}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={secondColumn}>
          <Grid.Column width={16}>
            <div>
              <UserSearchResultsListContainer />
            </div>
          </Grid.Column>
        </Grid.Row>
      </>
    );
  }
}
