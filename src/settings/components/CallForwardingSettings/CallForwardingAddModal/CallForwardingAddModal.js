import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";

export class CallForwardingAddModal extends React.Component {
  static propTypes = {
    localForwardList: PropTypes.array,
    status: PropTypes.object,
    addLocalForwardNumber: PropTypes.func.isRequired
  };

  state = {
    modalOpen: false,
    value: ""
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleFieldChangeAction = (e, { name, value }) =>
    this.setState({ [name]: value });

  addSelectedNumber = () => {
    const { localForwardList, addLocalForwardNumber, status } = this.props;
    const remoteForwardList = status["destination-list"];

    this.handleClose();
    //If number is not already on the list...
    if (
      localForwardList.filter(option => option.value === this.state.value)
        .length === 0 &&
      remoteForwardList.filter(option => option === this.state.value).length ===
        0
    ) {
      addLocalForwardNumber(this.state.value);
    }
    this.setState({ value: "" });
  };

  render() {
    const { modalOpen, value } = this.state;

    return (
      <Modal
        open={modalOpen}
        trigger={
          <Button icon onClick={this.handleOpen}>
            <Icon name={"add"} />
          </Button>
        }
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="phone" content="Add a new number" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Phone number</label>
              <Form.Input
                placeholder="Phone number..."
                value={value}
                name={"value"}
                onChange={this.handleFieldChangeAction}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={this.addSelectedNumber}>
            <Icon name="checkmark" /> Add this number
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
