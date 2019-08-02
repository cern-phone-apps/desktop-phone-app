import React from 'react';
import PropTypes from 'prop-types';
import { Header, Checkbox, Form } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

export class RememberNumberSettings extends React.Component {
  rememberNumberOnChange = () => {
    const { setRememberNumber, rememberNumber } = this.props;
    setRememberNumber(!rememberNumber);
  };

  render = () => {
    const { rememberNumber } = this.props;

    return (
      <div>
        <ErrorBoundary>
          <Header as="h4">Remember phone number</Header>
          <Form>
            <Form.Field>
              <Checkbox
                toggle
                checked={rememberNumber}
                onChange={this.rememberNumberOnChange}
                label="Register automatically the selected phone
            number when app starts."
              />
            </Form.Field>
          </Form>
        </ErrorBoundary>
      </div>
    );
  };
}

RememberNumberSettings.propTypes = {
  rememberNumber: PropTypes.bool.isRequired,
  setRememberNumber: PropTypes.func.isRequired
};

export default RememberNumberSettings;
