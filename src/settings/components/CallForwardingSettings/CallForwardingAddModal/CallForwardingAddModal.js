import { Button, Form, Header, Icon, Modal, Search } from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";

import {
  UserSearchResultsFormatter,
  UserSearchUtils
} from "calls/components/search/utils";
import { logMessage } from "common/utils/logs";

/**
 * Renders the custom search result
 * @param title
 * @param icon
 * @param description
 * @returns {*}
 */
const resultRenderer = ({ title, icon, description }) => {
  return (
    <div className="content">
      <div className="title">{title}</div>
      <div className="description">
        <Icon name={icon} /> {description}
      </div>
    </div>
  );
};

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export class CallForwardingAddModal extends React.Component {
  static propTypes = {
    localForwardList: PropTypes.array,
    status: PropTypes.object,
    addLocalForwardNumber: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    selectExistingNumber: PropTypes.func.isRequired
  };

  state = {
    modalOpen: false, // Whether the modal is open or not
    value: "", // Value of the search field
    phoneValue: "" // Value of the phone field
  };

  /**
   * Handles the modal open status
   */
  handleOpen = () => this.setState({ modalOpen: true });

  /**
   * Handles the modal close status
   */
  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  /**
   * Handles changes on the phoneValue field
   * @param e
   * @param name
   * @param value
   */
  handleFieldChangeAction = (e, { name, value }) =>
    this.setState({ [name]: value });

  addExistingNumber = number => {
    logMessage("Number is already on the lists. We just add it");
    this.props.selectExistingNumber(number);
  };

  /**
   * Adds the current number to the local forwarding list.
   * It checks if the value is already on the list or in the
   * remote list.
   */
  addSelectedNumber = () => {
    const { localForwardList, addLocalForwardNumber, status } = this.props;
    const remoteForwardList = status["destination-list"];

    this.handleClose();
    //If number is not already on the list...
    if (
      localForwardList.filter(option => option.value === this.state.phoneValue)
        .length === 0 &&
      remoteForwardList.filter(option => option === this.state.phoneValue)
        .length === 0
    ) {
      addLocalForwardNumber(this.state.phoneValue);
    }else{
      this.addExistingNumber(this.state.phoneValue)
    }
    this.resetComponent();
  };

  forwardMobile = () => {
    logMessage("Forwarding to mobile...");
    this.setState({ phoneValue: this.props.me.mobile });
  };

  componentWillMount() {
    this.resetComponent();
  }

  /**
   * Sets the component in it's initial state
   */
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "", phoneValue: "" });

  /**
   * Handles the click action on a search result
   * @param e Event triggered
   * @param result Result clicked
   */
  handleResultSelect = (e, { result }) =>
    this.setState({ phoneValue: result.title });

  /**
   * Handles a change on the search field
   * @param e Event triggered
   * @param value Value of the field
   */
  handleSearchChange = (e, { value }) => {
    const { searchUsers } = this.props;

    this.setState({ isLoading: true, value });

    setTimeout(async () => {
      // If there is no input value, the component must be cleared
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      if (this.state.value.length > 3) {
        const result = await UserSearchUtils.searchUsersAndFormatResults(
          this.state.value,
          searchUsers,
          UserSearchResultsFormatter.formatResultsOneLinePerPhone
        );
        this.setState(result);
      }
    }, 300);
  };

  /**
   * Render method
   * @returns {*}
   */
  render() {
    const { modalOpen, value, phoneValue } = this.state;
    const { isLoading, results } = this.state;

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
            <Header as={"h3"}>Search a user</Header>
            <Form.Field>
              <Search
                fluid
                input={{ fluid: true }}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                placeholder={"Input a person's name"}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone number</label>
              <Form.Input
                placeholder="Phone number..."
                value={phoneValue}
                name={"phoneValue"}
                onChange={this.handleFieldChangeAction}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {this.props.me.mobile && (
            <Button onClick={this.forwardMobile} className={`MobileButton`}>
              <Icon name="mobile" /> Forward to mobile phone
            </Button>
          )}
          <Button onClick={this.handleClose} className={`CancelButton`}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="green"
            onClick={this.addSelectedNumber}
            className={`AddButton`}
          >
            <Icon name="checkmark" /> Add this number
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
