import * as React from 'react';
import { Button } from 'semantic-ui-react';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

function ClearRecentCallsSection(props) {
  const { clearRecentCalls } = props;
  return (
    <ErrorBoundary>
      <h4>Recent calls</h4>
      <p>
        You can clear your recent calls list here. Be aware, you won't be
        able to recover them afterwards.
      </p>
      <Button
        onClick={() => {
          if (
            window.confirm(
              'You are going to clear all your recent calls list.\nAre you sure ?'
            )
          ) {
            clearRecentCalls();
          }
        }}
      >
        Clear recent calls list
      </Button>
    </ErrorBoundary>
  );
}

export default ClearRecentCallsSection;
