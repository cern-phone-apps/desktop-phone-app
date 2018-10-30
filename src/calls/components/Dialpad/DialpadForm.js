import React, { Component } from "react";
import { Button, Form, Grid, Icon, Input } from "semantic-ui-react";
import CallerDialpadContainer from "calls/components/Dialpad/CallerDialpadContainer";
import PropTypes from "prop-types";

export class DialpadForm extends Component {
  render () {
    return (
      <div>
        <Form>
          <Form.Group inline>
            <Form.Field width={15}>
              <Input
                className={"DialPadInput"}
                value={this.props.value}
                placeholder={"Input a number..."}
                onChange={this.props.onChange}
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
            <Form.Field width={1}>
              <Button
                type={"button"}
                icon={"search"}
                circular
                onClick={this.props.toggleDialpadVisibility}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        {this.props.shouldDisplayDialpad && (
          <Grid.Column>
            <CallerDialpadContainer/>
          </Grid.Column>
        )}
      </div>
    );
  }
}

DialpadForm.propTypes = {
  value: PropTypes.any,
  shouldDisplayDialpad: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleDialpadVisibility: PropTypes.func.isRequired,
};