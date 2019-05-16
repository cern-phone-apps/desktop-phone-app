import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';

export const phoneService = ComponentToWrap =>
  class ThemeComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      phoneService: PropTypes.object
    };

    render() {
      const { phoneService } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `phoneService` prop, like a hook
      return (
        <ErrorBoundary>
          <ComponentToWrap {...this.props} phoneService={phoneService} />
        </ErrorBoundary>
      );
    }
  };

  export default phoneService;