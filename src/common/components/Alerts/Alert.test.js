import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alerts from './Alerts';

describe('Alerts', () => {
  it('Alerts renders correctly', () => {
    render(
      <Alerts
        alerts={{
          alerts: [
            {
              id: 5,
              subject: '>:()',
              content: 'Hou Hou',
              creation_date: '2019-11-13T00:00:00',
              state: true,
              level: null,
              seen: false
            },
            {
              id: 6,
              subject: '\ud83e\udd8d\ud83e\udd8d',
              content: '\ud83e\udd8d "HOUHOU"',
              creation_date: '2019-11-13T00:00:00',
              state: true,
              level: null,
              seen: false
            }
          ]
        }}
        getAlerts={() => null}
        alertSeen={() => null}
      />
    );
  });
  it('Alerts closes correctly', () => {
    let closed = 0;
    const { getByText } = render(
      <Alerts
        alerts={{
          alerts: [
            {
              id: 5,
              subject: '>:()',
              content: 'Hou Hou',
              creation_date: '2019-11-13T00:00:00',
              state: true,
              level: null,
              seen: false
            },
            {
              id: 6,
              subject: '\ud83e\udd8d\ud83e\udd8d',
              content: '\ud83e\udd8d "HOUHOU"',
              creation_date: '2019-11-13T00:00:00',
              state: true,
              level: null,
              seen: false
            }
          ]
        }}
        getAlerts={() => null}
        alertSeen={() => {
          closed = 1;
        }}
      />
    );
    fireEvent.click(getByText('x'));
    expect(closed).toBe(1);
  });
});
