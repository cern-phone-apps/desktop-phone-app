import React from 'react';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class SettingsButton extends React.Component {
  static propTypes = {
    openSettingsModal: PropTypes.func.isRequired,
    floated: PropTypes.string
  };

  static defaultProps = {
    floated: undefined
  };

  openSettingsModalAction = () => {
    const { openSettingsModal } = this.props;
    openSettingsModal();
  };

  render() {
    const { floated } = this.props;

    return (
      <Button
        onClick={this.openSettingsModalAction}
        className="flat"
        icon="settings"
        floated={floated}
      />
    );
  }
}

export default SettingsButton;
