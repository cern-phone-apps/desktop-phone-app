import React, { useEffect, useState } from 'react';
import { Message, Button } from 'semantic-ui-react';

export default function Alerts({ alerts, getAlerts, alertSeen }) {
  const [fetched, setFetched] = useState(0);
  useEffect(() => {
    if (!fetched) {
      getAlerts();
      setFetched(1);
    }
    let alerts_interval = setInterval(() => getAlerts(), 60 * 60 * 1000);
    return () => clearInterval(alerts_interval);
  }, []);

  let subject = null;
  let content = null;
  let id = null;
  for (let a = 0; alerts.alerts && alerts.alerts[a]; a++) {
    if (!alerts.alerts[a].seen) {
      subject = alerts.alerts[a].subject;
      content = alerts.alerts[a].content;
      id = alerts.alerts[a].id;
    }
  }
  if (!subject) return null;
  return (
    <Message
      negative
      style={{ position: 'absolute', bottom: '2%', right: '2%', width: '40%' }}
    >
      <Message.Header>
        {subject}
        <Button
          style={{
            float: 'right',
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            color: 'red'
          }}
          onClick={() => alertSeen(id)}
        >
          x
        </Button>
      </Message.Header>
      <p>{content}</p>
    </Message>
  );
}
