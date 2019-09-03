import React, { useState, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ElectronService from 'services/electron-service';
import { logMessage } from 'common/utils/logs';

const channelOptions = [
  {
    key: 'stable',
    text: 'Stable',
    value: 'latest'
  },
  {
    key: 'beta',
    text: 'Beta',
    value: 'beta'
  },
  {
    key: 'alpha',
    text: 'Alpha',
    value: 'alpha'
  }
];

export default function UpdateSettings() {
  const [value, setValue] = useState('latest');
  const handleChange = (e, { value: newValue }) => {
    logMessage(newValue);
    setValue(newValue);
    ElectronService.setUpdateChannelValue(newValue);
  };

  useEffect(() => {
    let result = ElectronService.getUpdateChannelValue();
    if (!result) {
      result = 'latest';
    }
    logMessage(result);
    setValue(result.channel);
  }, [value]);

  return (
    <ErrorBoundary>
      <Header as="h4">Update settings</Header>
      <Form>
        <Form.Field>
          <p>Configure how you receive automatic updates.</p>

          <Form.Dropdown
            id="update-channel-selector"
            placeholder="Select Update Channel"
            selection
            fluid
            labeled
            label="Select the update channel"
            onChange={handleChange}
            options={channelOptions}
            value={value}
          />
        </Form.Field>
      </Form>
    </ErrorBoundary>
  );
  // }
}
