import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './ToggleButton.css';

function ToggleButton({ displaySidebar }) {
  return (
    <Button as="a" className="flat" icon="sidebar" onClick={displaySidebar} tabIndex="0" aria-label="Display sidebar"/>
  );
}

ToggleButton.propTypes = {
  displaySidebar: PropTypes.func.isRequired
};

export default ToggleButton;
