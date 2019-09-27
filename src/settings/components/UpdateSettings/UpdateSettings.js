import React, { useState, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ElectronService from 'services/electron-service';
import { logMessage } from 'common/utils/logs';

const channelOptions = [
  {
    key: 'latest',
    text: 'Release',
    value: 'latest'
  },
  {
    key: 'alpha',
    text: 'Prerelease',
    value: 'alpha'
  }
];

export default function UpdateSettings() {
  const [value, setValue] = useState('latest');
  const handleChange = (e, { value: newValue }) => {
    logMessage('Handle channel change');
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
      <Header as="h4" tabIndex="0" aria-label="">Update settings</Header>
      <Form>
        <Form.Field>
          <p>Configure how you receive automatic updates.</p>
          <p>Shortcut to update: {() => {
            if (process.platform === 'darwin')
            {
              return ("Command + U");
            }
            else
            {
              return ("Control + U");
            }
          }}</p>

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
            tabIndex="0"
            aria-label="Select the update channel"
          />
        </Form.Field>
      </Form>
    </ErrorBoundary>
  );
  // }
}
