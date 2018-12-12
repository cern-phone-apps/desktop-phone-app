import React, { Component } from "react";
import { Grid, Form, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import CallerDialpadContainer from "../CallerDialpad";

export class CallerDialpadForm extends Component {
  render() {
    return (
      <>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form>
              <Form.Field width={16}>
                <Input
                  className={"DialpadInput"}
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

CallerDialpadForm.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
