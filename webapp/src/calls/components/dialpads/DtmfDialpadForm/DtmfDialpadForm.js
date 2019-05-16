import React, { Component } from 'react';
import { Grid, Form, Icon, Input } from 'semantic-ui-react';
import { logMessage } from "common/utils/logs";
import PropTypes from "prop-types";
import withPhoneService from 'calls/providers/PhoneProvider/PhoneService';
import { DtmfDialpad } from "../DtmfDialpad/DtmfDialpad";

function DtmfDialpadField(props) {
  return (
    <Form>
      <Form.Field width={16}>
        <Input
          className="DialpadInput"
          value={props.value}
          placeholder="Input a dtmf command..."
          onChange={props.onChange}
          icon={<Icon name="text telephone" inverted color="blue" circular />}
        />
      </Form.Field>
    </Form>
  );
}

DtmfDialpadField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export class DtmfDialpadForm extends Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired // Phone Service
  };

  state = {
    dialpadValue: ''
  };

  handleChange = (e, { value }) => this.setState({ dialpadValue: value });

  handleDialPadButtonClick = value => {
    const currentValue = this.state.dialpadValue;
    logMessage('handleDialPadButtonClick: ', value);
    this.setState({ dialpadValue: currentValue + value });
  };

  sendDtmf = () => {
    const { phoneService } = this.props;
    const { dialpadValue } = this.state;
    logMessage('Sending DTMF');
    phoneService.sendDtmfCommand(dialpadValue);
    this.setState({ dialpadValue: '' });
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <DtmfDialpadField
              value={this.state.dialpadValue}
              onChange={this.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <DtmfDialpad
              onButtonClick={this.handleDialPadButtonClick}
              sendDtmfClick={this.sendDtmf}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withPhoneService(DtmfDialpadForm);
//
// DtmfDialpadForm.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func.isRequired
// };
