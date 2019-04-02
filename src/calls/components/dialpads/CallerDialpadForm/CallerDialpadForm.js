import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import CallerDialpadContainer from "../CallerDialpad";
import { buildRecipient} from "calls/utils/utils";
import { formatPhoneNumber } from "calls/utils/utils";

export class CallerDialpadForm extends Component {

  static propTypes = {
    value: PropTypes.any,
    phoneService: PropTypes.object.isRequired,
  };

  handleDialpadChange = event => {
    const { updateDialpadValue } = this.props;
    updateDialpadValue(event.target.value);
  };


  makeCall = () => {

    const {value} = this.props;

    const formattedNumber = formatPhoneNumber(value);

    const recipient = {
      name: value,
      phoneNumber: formattedNumber
    };

    this.props.phoneService.makeCall(buildRecipient(recipient));
  };

  render = () => {
    return (
      <>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form onSubmit={this.makeCall} >
              <Form.Field width={16}>
                <Input
                  className={"DialpadInput"}
                  value={this.props.value}
                  placeholder={"Input a number..."}
                  onChange={this.handleDialpadChange}
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
            <CallerDialpadContainer />
          </Grid.Column>
        </Grid.Row>
      </>
    );
  }
}
