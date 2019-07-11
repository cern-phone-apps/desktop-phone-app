import React from 'react';
import { getWindowTitle } from 'calls/utils/utils';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RightColumnHeader from 'common/components/RightColumnHeader/RightColumnHeader';
import LeftColumnHeader from 'common/components/LeftColumnHeader/LeftColumnHeader';

export default function MainHeader(props) {
  const { connected, onCall, calling, activeNumber } = props;

  const title = getWindowTitle(connected, onCall, calling);

  return (
    <>
      <Responsive
        as={RightColumnHeader}
        title={title}
        activeNumber={activeNumber}
        {...Responsive.onlyComputer}
      />
      <Responsive
        as={LeftColumnHeader}
        title={title}
        {...Responsive.onlyMobile}
      />
      <Responsive
        as={LeftColumnHeader}
        title={title}
        {...Responsive.onlyTablet}
      />
    </>
  );
}

MainHeader.propTypes = {
  connected: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired,
  calling: PropTypes.bool.isRequired,
  activeNumber: PropTypes.string.isRequired
};
