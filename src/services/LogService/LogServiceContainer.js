import { connect } from 'react-redux';

import LogsProvider from 'services/LogService/LogService';

export function mapStateToProps({ settings }) {
  const { sendStats } = settings.settings;
  return {
    sendStats
  };
}

export default connect(
  mapStateToProps,
  null
)(LogsProvider);
