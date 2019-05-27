import {
  Button,
  Form,
  Grid,
  Icon,
  Radio,
  Segment,
  Message
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import { errorMessage } from 'common/utils/logs';
import SimRingingFieldsContainer from './SimultaneousRingingFields/SimultaneousRingingFieldsContainer';

import CallForwardingFieldsContainer from './CallForwardingFields/CallForwardingFieldsContainer';
import { getRadioButtonValue } from '../utils';

export class CallForwardingForm extends React.Component {
  static propTypes = {
    getCallForwardingStatus: PropTypes.func.isRequired,
    disableCallForwarding: PropTypes.func.isRequired,
    enableSimultaneousRinging: PropTypes.func.isRequired,
    status: PropTypes.shape({
      'destination-list': PropTypes.arrayOf(String).isRequired
    }).isRequired,
    activeNumber: PropTypes.string.isRequired,
    personId: PropTypes.string.isRequired
  };

  state = {
    isFetching: true,
    forwardStatus: 'disabled',
    fetchTimes: 0,
    ringingNumbers: [],
    forwardNumbers: []
  };

  /**
   * Fetch the data from the backend and set the default values on the
   * dropdown.
   */
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { activeNumber, getCallForwardingStatus } = this.props;

    let { fetchTimes } = this.state;
    this.setState({
      isFetching: true
    });

    const forwardingData = await getCallForwardingStatus(activeNumber);

    if (forwardingData && forwardingData.payload) {
      // Obtain values from the payload
      const { payload } = forwardingData;
      const callForwardingStatus = payload['call-forwarding'];
      const simultaneousRingingStatus = payload['simultaneous-ring'];

      // // Get radio button value
      const forwardStatus = getRadioButtonValue(
        callForwardingStatus,
        simultaneousRingingStatus
      );
      this.setState({
        forwardStatus,
        isFetching: false
      });
    } else if (forwardingData === undefined && fetchTimes < 2) {
      errorMessage('Forwarding data was not loaded');
      this.setState({ fetchTimes: (fetchTimes += 1) });
      this.fetchData();
    }
  };

  // Form
  handleRadioChangeAction = (e, { value }) => {
    console.log(value);
    this.setState({ forwardStatus: value });
  };

  handleFetchAgain = () => {
    const { isFetching } = this.state;
    if (!isFetching) {
      this.fetchData();
    } else {
      console.log('Already fetching...');
    }
  };

  handleSave = () => {
    const {
      activeNumber,
      disableCallForwarding,
      enableSimultaneousRinging,
      personId
    } = this.props;

    const { forwardStatus, ringingNumbers, forwardNumbers } = this.state;

    console.log('Saving Call Forwarding data....');
    console.log(`Forward status: ${forwardStatus}`);
    console.log(`Ringing numbers: ${ringingNumbers}`);
    console.log(`Forward numbers: ${forwardNumbers}`);

    if (forwardStatus === 'disabled') {
      console.log(`Calling disableCallForwarding with ${activeNumber}`);
      disableCallForwarding(activeNumber);
    } else if (forwardStatus === 'simultaneous') {
      enableSimultaneousRinging(activeNumber, personId, ringingNumbers);
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });

  updateRingingNumbers = numbers => {
    this.setState({ ringingNumbers: numbers });
  };

  updateForwardNumbers = numbers => {
    this.setState({ forwardNumbers: numbers });
  };

  render() {
    const { status } = this.props;
    const { forwardStatus, isFetching } = this.state;

    if (status && status.success === false) {
      return (
        <Message negative>
          We&apos;re sorry, but Call Forwarding settings are not available{' '}
          <Button
            loading={isFetching}
            onClick={this.handleFetchAgain}
            icon="refresh"
          />
        </Message>
      );
    }

    return (
      <Segment padded basic loading={isFetching}>
        <Form>
          <Grid columns={2} relaxed="very" divided>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Radio
                    label="Disable Call Forwarding"
                    name="radioGroup"
                    value="disabled"
                    checked={forwardStatus === 'disabled'}
                    onChange={this.handleRadioChangeAction}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <SimRingingFieldsContainer
              forwardStatus={forwardStatus}
              isFetching={isFetching}
              onChange={this.handleRadioChangeAction}
              saveAction={this.updateRingingNumbers}
            />

            <CallForwardingFieldsContainer
              forwardStatus={forwardStatus}
              disabled={isFetching}
              isFetching={isFetching}
              onChange={this.handleRadioChangeAction}
              saveAction={this.updateForwardNumbers}
            />
          </Grid>
          <Grid columns={1} relaxed="very" divided>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Button icon onClick={this.handleSave}>
                    <Icon name="save" /> Save
                  </Button>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default CallForwardingForm;
