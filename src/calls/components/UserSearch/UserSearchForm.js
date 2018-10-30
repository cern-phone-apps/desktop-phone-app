import React, { Component } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import UserSearchResultsListContainer from "calls/components/UserSearch/UserSearchResultsListContainer";

export class UserSearchForm extends Component {
  static propTypes = {
    value: PropTypes.string,
    onCall: PropTypes.bool,
    calling: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    toggleDialpadVisibility: PropTypes.func.isRequired
  };

  styles = {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  };

  render() {
    const {
      onSubmit,
      onChange,
      toggleDialpadVisibility,
      onCall,
      calling,
      value,
      enableSearch
    } = this.props;

    return (
      <div style={this.styles}>
        <Form onSubmit={onSubmit}>
          <Form.Group inline>
            <Form.Field width={15}>
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
            <Form.Field width={1}>
              <Button
                type={"button"}
                icon={"text telephone"}
                circular
                onClick={toggleDialpadVisibility}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        {!onCall && !calling && <UserSearchResultsListContainer />}
      </div>
    );
  }
}
