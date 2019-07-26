import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Message, Segment } from 'semantic-ui-react';

export class ErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.array,
    t: PropTypes.func.isRequired
  };

  styles = {
    margin: 0,
    padding: '0 0 1em 0'
  };

  render() {
    const { errors } = this.props;

    const results = errors.filter(error => error && error.statusCode);

    if (results.length < 1) {
      return '';
    }
    return (
      <Segment basic style={this.styles}>
        <Message color="red">
          <ul>
            {results.map((element, index) => (
              <li key={index.toString()}>
                {element.message} ({element.statusCode})
              </li>
            ))}
          </ul>
        </Message>
      </Segment>
    );
  }
}

export default translate('calls')(ErrorMessage);
