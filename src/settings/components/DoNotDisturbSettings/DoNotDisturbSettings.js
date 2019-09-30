import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

function DoNotDisturbSettings({ doNotDisturb, setUserDoNotDisturb, getMe }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMe().then(result => {
      if (result && !result.error) {
        setUserDoNotDisturb(result.payload.doNotDisturb).then(() => {
          setLoading(false);
        });
      }
    });
  }, []);

  const toggleDontDisturb = () => {
    setLoading(true);
    setUserDoNotDisturb(!doNotDisturb).then(() => {
      setLoading(false);
    });
  };

  return (
    <ErrorBoundary>
      <h4>Do not disturb</h4>
      <Button onClick={toggleDontDisturb}>
        {doNotDisturb ? 'Disable Do not disturb' : 'Enable Do not disturb'}
      </Button>
    </ErrorBoundary>
  );
}

export default DoNotDisturbSettings;
