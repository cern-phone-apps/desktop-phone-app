import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Timer from '../../calls/components/Timer/Timer';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  banner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#1bb717',
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  bannerText: { color: 'white' }
});

export default function withOnGoingCallBanner(WrappedComponent) {
  const WithOnGoingCallBanner = props => {
    const { inCall } = props;
    return inCall ? (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Ongoing call...</Text>
          <Timer style={styles.bannerText} />
        </View>
        <WrappedComponent {...props} />
      </View>
    ) : (
      <WrappedComponent {...props} />
    );
  };

  WithOnGoingCallBanner.displayName = `WithOnGoingCallBanner(${getDisplayName(
    WrappedComponent
  )})`;

  WithOnGoingCallBanner.propTypes = {
    inCall: PropTypes.bool
  };

  WithOnGoingCallBanner.defaultProps = {
    inCall: false
  };

  const mapStateToProps = state => {
    const { call } = state.calls;
    return {
      inCall: call.inCall
    };
  };

  return connect(mapStateToProps)(WithOnGoingCallBanner);
}
