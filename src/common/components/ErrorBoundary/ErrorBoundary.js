import React from "react";
import Raven from "raven-js";
import { logMessage } from "common/utils/logs";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    logMessage(
      `Component Did Catch error on '${process.env.NODE_ENV}': ${error}`
    );
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    if (process.env.NODE_ENV === "production") {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
