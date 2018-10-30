import React, { Component } from "react";
import PropTypes from "prop-types";
import { logMessage } from "common/utils";

import "./UserSearch.css";
import { DialpadForm } from "calls/components/Dialpad/DialpadForm";
import { UserSearchForm } from "calls/components/UserSearch/UserSearchForm";

class UserSearch extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    displayDialpad: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    userSelected: PropTypes.bool.isRequired,
    dialpadValue: PropTypes.string,
    selectUser: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    updateDialpadValue: PropTypes.func.isRequired,
    toggleDialpad: PropTypes.func.isRequired
  };

  state = {
    timeout: 0,
    activeItem: "inbox",
    searchValue: ""
  };

  shouldEnableSearch = () => {
    const { searchValue } = this.state;
    logMessage(`Should enable search? ${searchValue}: ${searchValue !== ""}`);
    return searchValue !== "";
  };

  componentDidMount() {
    this.shouldEnableSearch();
  }

  _handleSearchTimeout(value) {
    const { searchUsers } = this.props;
    const { searchValue } = this.state;

    logMessage("Calling set timeout");
    if (searchValue && searchValue.length > 3) {
      searchUsers(value).then(() => {
        this.setState({
          isLoading: false
        });
      });
    }
  }

  removeSearchResults = () => {
    const { clearSearchResults } = this.props;
    const { searchValue } = this.state;

    if (searchValue !== "") {
      clearSearchResults();
    }
  };

  handleSubmit = () => {
    const { searchUsers, unSelectUser } = this.props;

    const { searchValue } = this.state;
    logMessage(`Starting the search: ${searchValue}`);
    searchUsers(searchValue).then(result => {
      logMessage(result);
      this.setState({
        isLoading: false
      });
      unSelectUser();
    });
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

  handleDialpadChange = event => {
    const { updateDialpadValue } = this.props;
    updateDialpadValue(event.target.value);
  };

  toggleDialpadValue = () => {
    logMessage(`Toggle the dialpad value...`);
    const { toggleDialpad, displayDialpad } = this.props;
    toggleDialpad(!displayDialpad);
  };

  render() {
    const { searchValue } = this.state;
    const { dialpadValue, onCall, calling, displayDialpad } = this.props;
    const shouldEnableSearch = this.shouldEnableSearch();

    if (displayDialpad) {
      return (
        <DialpadForm
          value={dialpadValue}
          onChange={this.handleDialpadChange}
          toggleDialpadVisibility={this.toggleDialpadValue}
          shouldDisplayDialpad={displayDialpad}
        />
      );
    }
    return (
      <UserSearchForm
        enableSearch={shouldEnableSearch}
        onSubmit={this.handleSubmit}
        value={searchValue}
        onChange={this.handleSearchChange}
        toggleDialpadVisibility={this.toggleDialpadValue}
        onCall={onCall}
        calling={calling}
      />
    );
  }
}

export default UserSearch;
