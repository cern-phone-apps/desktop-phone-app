import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OnCallDetails.css';
import { Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import Timer from 'calls/components/Timer/Timer';

export function HangupButton(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="ui circular red icon button OnCallDetails__HangupButton"
    >
      <i className="phone icon" />
    </button>
  );
}

HangupButton.propTypes = { onClick: PropTypes.func };

export class OnCallDetails extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired,
    caller: PropTypes.object,
    receivingCall: PropTypes.bool.isRequired
  };

  static defaultProps = {
    caller: {}
  };

  hangup = () => {
    const { phoneService } = this.props;
    phoneService.hangUpCurrentCallAction();
  };

  render() {
    const { t, caller, call } = this.props;
    return (
      <Segment basic>
        <Segment textAlign="center">
          <div>
            <h3 className="ui center aligned header">{t('onCallWithText')}</h3>
            <h2 className="ui center aligned header">
              <Icon name="user" />{' '}
              {caller ? caller.phoneNumber : caller.phoneNumber}
            </h2>
            <div className="ui center aligned basic segment">
              <Timer startTime={call.startTime} />
            </div>
            <div className="ui center aligned basic segment">
              <HangupButton onClick={() => this.hangup()} />
              <button type="button" className="ui circular icon button">
                <i className="mute icon" />
              </button>
            </div>
          </div>
        </Segment>
      </Segment>
    );
  }
}

export default translate('calls')(OnCallDetails);
