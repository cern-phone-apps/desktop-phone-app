import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Message, Segment } from "semantic-ui-react";
import { logMessage } from "common/utils/logs";

export class ErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.array,
    t: PropTypes.func.isRequired
  };

  styles = {
    margin: 0,
    padding: "0 0 1em 0"
  };

  render() {
    logMessage(`Displaying errors`);
    const { errors } = this.props;

    let results = errors.filter(error => error && error.statusCode);

    if (results.length < 1) {
      return "";
    }
    return (
      <Segment basic style={this.styles}>
        <Message color="red">
          <ul>
            {results.map((element, index) => {
              return (
                <li key={`message${index}`}>
                  {element.message} ({element.statusCode})
                </li>
              );
            })}
          </ul>
        </Message>
      </Segment>
    );
  }
}

export default translate("calls")(ErrorMessage);
