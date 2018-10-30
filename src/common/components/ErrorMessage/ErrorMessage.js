import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Button, Icon, Message, Modal, Segment } from "semantic-ui-react";

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
    const { errors } = this.props;

    let results = errors.filter(error => error && error.statusCode);

    if (results.length < 1) {
      return "";
    }
    return (
      <Modal
        trigger={
          <Button as={"a"} className={"flat"}>
            <Icon color={"red"} name={"warning"} />
          </Button>
        }
      >
        <Modal.Header>Errors</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Segment textAlign={"center"} basic style={this.styles}>
              {results.map((element, index) => {
                return (
                  <Message color="red" key={`message${index}`}>
                    {element.message} ({element.statusCode})
                  </Message>
                );
              })}
            </Segment>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate("calls")(ErrorMessage);
