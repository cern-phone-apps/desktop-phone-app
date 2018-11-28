import React, { Component } from "react";
import { Header, Icon, Loader, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./UserSearch.css";
import { logMessage } from "common/utils";

const UserSearchResult = ({ onClick, item }) => {
  const styles = {
    cursor: "pointer"
  };
  return (
    <Segment onClick={onClick} style={styles} className={'UserSearchResult'}>
      <Header as="h4">
        <Icon name="user" color={"blue"} />
        <Header.Content>
          {item.title}
          <Header.Subheader>
            {item.description} - {item.username}
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};

class UserSearchResultsList extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    searching: PropTypes.bool.isRequired,
    selectUser: PropTypes.func.isRequired,
    getUserProfile: PropTypes.func.isRequired
  };

  handleResultSelect = result => {
    const { selectUser, getUserProfile } = this.props;

    logMessage(result);
    selectUser(result);
    getUserProfile(result.username);
  };

  styles = {
    display: "block",
    flex: "1 1 auto"
  };

  render() {
    const { results, searching } = this.props;

    if (searching) {
      return (
        <Segment basic textAlign={"center"}>
          <Loader active inline="centered" content="Searching..." />
        </Segment>
      );
    }

    return (
      <div className={'UserSearchResultsList'}>
        {results.map((item, index) => {
          return (
            <UserSearchResult
              key={`item-${index}`}
              onClick={() => this.handleResultSelect(item)}
              item={item}
            />
          );
        })}
      </div>
    );
  }
}

export default UserSearchResultsList;
