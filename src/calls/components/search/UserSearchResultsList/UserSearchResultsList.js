import React, { Component } from "react";
import { Loader, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import "../UserSearch/UserSearch.css";
import UserSearchResultContainer from "calls/components/search/UserSearchResult/UserSearchResultContainer";
import { logMessage } from "common/utils/logs";
import styles from "./UserSearchResultList.module.css"

export class UserSearchResultsList extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    searching: PropTypes.bool.isRequired
  };

  styles = {
    display: "block",
    flex: "1 1 auto"
  };

  render() {
    const { searching, searchResults } = this.props;
    logMessage(searchResults);
    if (searching) {
      return (
        <Segment basic textAlign={"center"}>
          <Loader active inline="centered" content="Searching..." />
        </Segment>
      );
    }

    return (
      <div className={styles.userSearchList}>
        {searchResults.map((user, index) => (
          <UserSearchResultContainer key={`item-${index}`} user={user} />
        ))}
      </div>
    );
  }
}

export default UserSearchResultsList;
