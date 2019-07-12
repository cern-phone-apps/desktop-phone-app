import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './ToggleButton.css';

function ToggleButton({ displaySidebar }) {
  return (
    <Button as="a" className="flat" icon="sidebar" onClick={displaySidebar} />
  );
}

ToggleButton.propTypes = {
  displaySidebar: PropTypes.func.isRequired
};

export default ToggleButton;
