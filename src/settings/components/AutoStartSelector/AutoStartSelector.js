import React from 'react';
import { Header, Checkbox, Form } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ElectronService from 'services/electron-service';

export class AutoStartSelector extends React.Component {
  autoStartOnChange = () => {
    ElectronService.setAutoStart(!ElectronService.getAutoStart());
    this.forceUpdate();
  };

  render = () => {
    return (
      <div>
        <ErrorBoundary>
          <Header as="h4">AutoStart</Header>
          <Form>
            <Form.Field>
              <Checkbox
                toggle
                checked={ElectronService.getAutoStart()}
                onChange={this.autoStartOnChange}
                label="AutoStart the App with the system."
              />
            </Form.Field>
          </Form>
        </ErrorBoundary>
      </div>
    );
  };
}

export default AutoStartSelector;
