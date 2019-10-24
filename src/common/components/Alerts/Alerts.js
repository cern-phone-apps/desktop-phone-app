import React from 'react';
import dialBackendApi from 'services/api';

export default function Alerts(props) {
  return (
    <small>
      <button onClick={() => console.log(props.getAlerts)}>getAlerts</button>
    </small>
  );
}
