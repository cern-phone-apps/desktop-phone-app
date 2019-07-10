import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './ColumnHeader.css';

export function ColumnHeader({ children, style }) {
  return (
    <header className="padded-item column-header" style={style}>
      <Grid>{children}</Grid>
    </header>
  );
}

ColumnHeader.propTypes = {
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired
};

ColumnHeader.defaultProps = {
  style: {}
};

export default ColumnHeader;
