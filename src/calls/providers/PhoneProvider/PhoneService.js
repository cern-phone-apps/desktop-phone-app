import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

export const withPhoneService = ComponentToWrap => {
  const WithPhoneService = (props, context) => {
    const { phoneService } = context;
    return (
      <ErrorBoundary>
        <ComponentToWrap {...props} phoneService={phoneService} />
      </ErrorBoundary>
    );
  };

  WithPhoneService.contextTypes = {
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired
    })
  };

  return WithPhoneService;
};
export default withPhoneService;
