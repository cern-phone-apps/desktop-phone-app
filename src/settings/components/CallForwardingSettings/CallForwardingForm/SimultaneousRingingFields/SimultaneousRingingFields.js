import {
  Dropdown,
  Form,
  Grid,
  Header,
  Radio,
  GridRow
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import CallForwardingAddModalContainer from '../../CallForwardingAddModal/CallForwardingAddModalContainer';
import { buildDropdownOptionsArray } from '../../utils';

class SimRingingFields extends React.Component {
  static propTypes = {
    status: PropTypes.shape({
      'destination-list': PropTypes.arrayOf(String).isRequired
    }).isRequired,
    localRingingList: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string
      })
    ),
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    localRingingList: []
  };

  state = {
    defaultDropdownValues: [],
    ringingList: []
  };

  componentDidMount() {
    this.selectDefaultDropdownSelection();
  }

  componentDidUpdate(prevProps, prevState) {
    const { localRingingList, status } = this.props;
    if (prevProps.localRingingList !== localRingingList) {
      this.updateRingingList(true);
    }

    if (prevProps.status !== status) {
      this.updateRingingList();
      this.selectDefaultDropdownSelection();
    }
  }

  /**
   * Set the default values of the dropdown with the ones fetched from the backend.
   */
  selectDefaultDropdownSelection = () => {
    const { status } = this.props;
    const defaultDropdownValues = status['destination-list'] || [];
    this.setState(
      {
        defaultDropdownValues
      },
      () => {
        this.props.saveAction(defaultDropdownValues);
      }
    );
  };

  /**
   * Updates the forward list with the values of the local forward list
   * and the remote list
   */
  updateRingingList = newAdded => {
    const { localRingingList, status } = this.props;
    const { defaultDropdownValues } = this.state;

    const remoteList = status['destination-list']
      ? buildDropdownOptionsArray(status['destination-list'])
      : [];

    if (newAdded) {
      this.setState(
        {
          ringingList: [...remoteList, ...localRingingList],
          defaultDropdownValues: [
            ...defaultDropdownValues,
            localRingingList[0].value
          ]
        },
        () => {
          this.props.saveAction(this.state.defaultDropdownValues);
        }
      );
    } else {
      this.setState({
        ringingList: [...remoteList, ...localRingingList]
      });
    }
  };

  selectExistingNumber = number => {
    const { localRingingList } = this.props;
    const { remoteList, defaultDropdownValues } = this.state;

    this.setState(
      {
        ringingList: [...remoteList, ...localRingingList],
        defaultDropdownValues: [...defaultDropdownValues, number]
      },
      () => {
        this.props.saveAction(this.state.defaultDropdownValues);
      }
    );
  };

  handleDropdownChangeAction = (e, { value }) => {
    this.setState({ defaultDropdownValues: value }, () => {
      this.props.saveAction(this.state.defaultDropdownValues);
    });
  };

  render = () => {
    const { forwardStatus, isFetching, onChange } = this.props;

    const { defaultDropdownValues, ringingList } = this.state;

    return (
      <GridRow>
        <Grid.Column>
          <Form.Field>
            <Radio
              label="Simultaneous ringing"
              name="radioGroup"
              value="simultaneous"
              checked={forwardStatus === 'simultaneous'}
              onChange={onChange}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Header as="h5">Ringing list</Header>
          <Form.Group>
            <Form.Field>
              <Dropdown
                multiple
                labeled
                search
                selection
                value={defaultDropdownValues}
                options={ringingList}
                placeholder="Select Number"
                loading={isFetching}
                disabled={isFetching}
                onChange={this.handleDropdownChangeAction}
              />
            </Form.Field>
            <CallForwardingAddModalContainer
              selectExistingNumber={this.selectExistingNumber}
              localListType="ringing"
            />
          </Form.Group>
        </Grid.Column>
      </GridRow>
    );
  };
}

export default SimRingingFields;
