import { Icon, Segment, Header } from "semantic-ui-react";
import React from "react";
import PropTypes from "prop-types";
import styles from "./UserSearchResult.module.css";
import { logMessage } from "common/utils/logs";
import { formatUserOrganization } from "calls/utils/formatters";

export default class UserSearchResult extends React.Component{
  static propTypes = {
    user: PropTypes.object.isRequired,
    selectUser: PropTypes.func.isRequired
  };

  handleResultClickAction = () => {
    const { selectUser, user } = this.props;
    selectUser(user);
  };

  render = () => {
    const { user } = this.props;
    logMessage("Rendering UserSearchResult");
    logMessage(user);

    return (
      <Segment
        onClick={this.handleResultClickAction}
        className={styles.searchResult}
      >
        <Header as="h4">
          <Icon name="user" color={"blue"} />
          <Header.Content>
            {user.displayName}
            <Header.Subheader>
              {formatUserOrganization(user)} - {user.username}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    );
  };
}
