import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

class UserProfileCloseButton extends Component {
  static propTypes = {
    unSelectUser: PropTypes.func.isRequired
  };

  handleCLickAction = () => {
    const { unSelectUser } = this.props;
    unSelectUser();
  };

  render() {
    return (
      <div>
        <Button labelPosition='left' icon='left chevron' content='Back' onClick={this.handleCLickAction} />
      </div>
    );
  }
}

export default UserProfileCloseButton;
