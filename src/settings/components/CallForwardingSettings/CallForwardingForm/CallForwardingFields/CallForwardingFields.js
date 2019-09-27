import { Dropdown, Form, Grid, Header, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { logMessage } from 'common/utils/logs';
import CallForwardingAddModalContainer from '../../CallForwardingAddModal/CallForwardingAddModalContainer';
import { buildDropdownOptionsArray } from '../../utils';

class CallForwardingFields extends React.Component {
  static propTypes = {
    status: PropTypes.shape({
      'destination-list': PropTypes.arrayOf(String).isRequired
    }).isRequired,
    localForwardList: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onChange: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    forwardStatus: PropTypes.string.isRequired
  };

  static defaultProps = {
    localForwardList: []
  };

  state = {
    defaultDropdownValues: '',
    forwardList: []
  };

  componentDidMount() {
    this.selectDefaultDropdownSelection();
  }

  componentDidUpdate(prevProps, prevState) {
    const { localForwardList, status } = this.props;
    if (prevProps.localForwardList !== localForwardList) {
      this.updateForwardList(true);
    }

    if (prevProps.status !== status) {
      this.updateForwardList();
      this.selectDefaultDropdownSelection();
    }
  }

  /**
   * Set the default values of the dropdown with the ones fetched from the backend.
   */
  selectDefaultDropdownSelection = () => {
    const { status } = this.props;
    if (status['destination-list'] && status['destination-list'].length > 0) {
      const defaultDropdownValues = status['destination-list'][0];
      this.setState(
        {
          defaultDropdownValues
        },
        () => {
          this.props.saveAction(defaultDropdownValues);
        }
      );
    }
  };

  /**
   * Updates the forward list with the values of the local forward list
   * and the remote list
   */
  updateForwardList = newAdded => {
    const { localForwardList, status } = this.props;

    logMessage('Updating forward list...');

    const remoteList = status['destination-list']
      ? buildDropdownOptionsArray(status['destination-list'])
      : [];

    if (newAdded) {
      const { value } = localForwardList[0];
      this.setState(
        {
          forwardList: [...remoteList, ...localForwardList],
          defaultDropdownValues: value
        },
        () => {
          this.props.saveAction(value);
        }
      );
    } else {
      this.setState({
        forwardList: [...remoteList, ...localForwardList]
      });
    }
  };

  handleDropdownChangeAction = (e, { value }) => {
    this.setState({ defaultDropdownValues: value }, () => {
      this.props.saveAction(value);
    });
  };

  selectExistingNumber = number => {
    const { localForwardList } = this.props;
    const { remoteList } = this.state;

    logMessage(`Selecting existing number`);

    this.setState(
      {
        forwardList: [...remoteList, ...localForwardList],
        defaultDropdownValues: number
      },
      () => {
        this.props.saveAction(number);
      }
    );
  };

  render = () => {
    const { forwardStatus, isFetching, onChange } = this.props;

    const { defaultDropdownValues, forwardList } = this.state;

    return (
      <Grid.Row>
        <Grid.Column>
          <Form.Field>
            <Radio
              label="Forward to"
              name="radioGroup"
              value="forward"
              checked={forwardStatus === 'forward'}
              onChange={onChange}
              tabIndex="0"
              aria-label="Forward to"
            />
          </Form.Field>
        </Grid.Column>

        <Grid.Column>
          <Header as="h5">Forward list</Header>
          <Form.Group>
            <Form.Field>
              <Dropdown
                tabIndex="0"
                aria-label="Select Number"
                labeled
                search
                selection
                multiple={false}
                value={defaultDropdownValues}
                options={forwardList}
                placeholder="Select Number for call forwarding"
                loading={isFetching}
                disabled={isFetching}
                onChange={this.handleDropdownChangeAction}
              />
            </Form.Field>
            <CallForwardingAddModalContainer
              selectExistingNumber={this.selectExistingNumber}
              localListType="forward"
            />
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  };
}

export default CallForwardingFields;
