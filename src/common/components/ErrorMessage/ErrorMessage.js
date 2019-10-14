import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

/**
 * Displays one or several error messages.
 * @param {errors} Array of errors with message (string) and statusCode (string)
 * @param {solutions} Array of string corresponding to the solutions to the error
 */
function ErrorMessage({ errors, solutions }) {
  const [showError, setShowError] = useState(1);
  const results = errors.filter(error => error && error.statusCode);

  // No errors or the user clicked on the close button
  if (results.length < 1 || !showError) {
    return null;
  }

  // Format the errors to display the message and the status code
  const messages = results.map(
    element => `${element.message} (${element.statusCode})`
  );

  /*
   If we have only one error, we display it as header, adding possible solutins as children.

   If we have more than one errors, we only display them, without solutions.
  */
  return (
    <Message
      error
      onDismiss={() => setShowError(!showError)}
      header={
        results.length === 1
          ? `${results[0].message} (${results[0].statusCode})`
          : `An error has occurred`
      }
      list={results.length === 1 ? [...solutions] : [...messages]}
    />
  );
}

ErrorMessage.propTypes = {
  solutions: PropTypes.arrayOf(PropTypes.string.isRequired),
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      statusCode: PropTypes.string.isRequired
    })
  )
};

ErrorMessage.defaultProps = {
  solutions: [],
  errors: []
};

export default ErrorMessage;
