import { Button, Dropdown, Form, Icon, Radio } from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";
import { errorMessage, logMessage } from "common/utils/logs";
import CallForwardingAddModalContainer from "settings/components/CallForwardingSettings/CallForwardingAddModal/CallForwardingAddModalContainer";

export class CallForwardingForm extends React.Component {
  static propTypes = {
    addLocalForwardNumber: PropTypes.func.isRequired,
    localForwardList: PropTypes.array.isRequired,
    fetchingStatus: PropTypes.bool.isRequired,
    status: PropTypes.object.isRequired
  };

  state = {
    remoteList: [],
    forwardList: [],
    defaultDropdownValues: [],
    isFetching: true,
    forwardStatus: "disabled",
    fetchTimes: 0
  };

  /**
   * Fetch the data from the backend and set the default values on the
   * dropdown.
   */
  componentDidMount() {
    this.fetchData();
    this.selectDefaultDropdownSelection();
  }

  /**
   * Set the default values of the dropdown with the ones fetched from the backend.
   */
  selectDefaultDropdownSelection = () => {
    logMessage("Selecting the default values...");
    this.setState({
      defaultDropdownValues: this.props.status["destination-list"]
    });
  };

  fetchData = async () => {
    const forwardingData = await this.props.getCallForwardingStatus();
    if (forwardingData && forwardingData.payload.result.success) {
      // Obtain values from the payload
      const { payload } = forwardingData;
      const destinationList = payload.result["destination-list"];
      const callForwardingStatus = payload.result["call-forwarding"];
      const simultaneousRingingStatus = payload.result["simultaneous-ring"];
      // Build dropdown options
      const remoteList = this.buildDropdownOptionsArray(destinationList);
      // Get radio button value
      let forwardStatus = this.getRadioButtonValue(
        callForwardingStatus,
        simultaneousRingingStatus
      );

      this.setState({
        remoteList: remoteList,
        forwardStatus: forwardStatus,
        isFetching: false,
        forwardList: [...remoteList, ...this.props.localForwardList]
      });
    } else if (forwardingData === undefined && this.state.fetchTimes < 2) {
      errorMessage("Forwarding data was not loaded");
      this.setState({ fetchTimes: (this.state.fetchTimes += 1) });
      this.fetchData();
    }
  };

  getRadioButtonValue(callForwardingStatus, simultaneousRingingStatus) {
    let forwardStatus = "disabled";
    if (callForwardingStatus) {
      forwardStatus = "forward";
    }
    if (simultaneousRingingStatus) {
      forwardStatus = "simultaneous";
    }
    return forwardStatus;
  }

  buildDropdownOptionsArray(stringValue) {
    return stringValue.map(value => {
      return { text: value, value: value };
    });
  }

  /**
   * Updates the forward list with the values of the local forward list
   * and the remote list
   */
  updateForwardList = () => {
    this.setState({ isFetching: true });
    this.setState({
      forwardList: [...this.state.remoteList, ...this.props.localForwardList],
      defaultDropdownValues: [
        ...this.state.defaultDropdownValues,
        this.props.localForwardList[0].value
      ]
    });
    this.setState({ isFetching: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.localForwardList !== this.props.localForwardList) {
      this.updateForwardList();
    }
  }

  // Form
  handleRadioChangeAction = (e, { value }) =>
    this.setState({ forwardStatus: value });

  handleDropdownChangeAction = (e, { value }) => {
    this.setState({ defaultDropdownValues: value });
  };

  handleSave = () => {};

  handleOpen = () => this.setState({ modalOpen: true });

  render() {
    const {
      forwardStatus,
      defaultDropdownValues,
      forwardList,
      isFetching
    } = this.state;

    return (
      <Form>
        <Form.Field>
          <Radio
            label="Disable Call Forwarding"
            name="radioGroup"
            value="disabled"
            checked={forwardStatus === "disabled"}
            onChange={this.handleRadioChangeAction}
          />
        </Form.Field>
        <Form.Group>
          <Form.Field width={4}>
            <Radio
              label="Forward to"
              name="radioGroup"
              value="forward"
              checked={forwardStatus === "forward"}
              onChange={this.handleRadioChangeAction}
            />
          </Form.Field>
          <Form.Field width={9}>
            <Dropdown
              multiple
              labeled={true}
              search
              selection
              value={defaultDropdownValues}
              options={forwardList}
              placeholder="Select Number"
              loading={isFetching}
              disabled={isFetching}
              onChange={this.handleDropdownChangeAction}
            />
          </Form.Field>
          <Form.Field width={3}>
            <CallForwardingAddModalContainer />
            <Button icon onClick={this.handleSave}>
              <Icon name={"save"} />
            </Button>
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field width={4}>
            <Radio
              label="Simultaneous ringing"
              name="radioGroup"
              value="simultaneous"
              checked={forwardStatus === "simultaneous"}
              onChange={this.handleRadioChangeAction}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}
