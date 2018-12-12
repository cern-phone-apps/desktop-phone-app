import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import { DtmfDialpad } from "../DtmfDialpad/DtmfDialpad";
import { logMessage } from "common/utils";

export class DtmfDialpadForm extends Component {
  state = {
    dialpadValue: ""
  };

  handleChange = (e, { value }) => this.setState({ dialpadValue: value });

  handleDialPadButtonClick = value => {
    let currentValue = this.state.dialpadValue;
    logMessage("handleDialPadButtonClick: ", value);
    this.setState({ dialpadValue: currentValue + value });
  };

  sendDtmf = () => {
    logMessage("Sending DTMF");
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form>
              <Form.Field width={16}>
                <Input
                  className={"DialpadInput"}
                  value={this.state.dialpadValue}
                  placeholder={"Input a dtmf command..."}
                  onChange={this.handleChange}
                  icon={
                    <Icon
                      name="text telephone"
                      inverted
                      color={"blue"}
                      circular
                    />
                  }
                />
              </Form.Field>
            </Form>
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
//
// DtmfDialpadForm.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func.isRequired
// };
