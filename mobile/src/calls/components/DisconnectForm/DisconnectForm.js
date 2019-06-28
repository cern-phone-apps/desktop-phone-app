import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from 'dial-core';

import { withNavigation } from 'react-navigation';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneService';

const disconnect = phoneService => async () => {
  console.log('Disconnecting user');
  await phoneService.disconnectUser();
};

export const DisconnectForm = ({
  navigation,
  phoneService,
  resetActiveNumber
}) => {
  return (
    <ListItem
      onPress={async () => {
        await resetActiveNumber();
        await disconnect(phoneService)();
        navigation.navigate('RegisterScreen');
      }}
      key="changeNumber"
      title="Change registered phone number"
      leftIcon={{ name: 'phone' }}
    />
  );
};

DisconnectForm.propTypes = {
  phoneService: PropTypes.shape({
    disconnectUser: PropTypes.func.isRequired
  }).isRequired,
  resetActiveNumber: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetActiveNumber: authActions.resetActiveNumber
    },
    dispatch
  );
}

export default withNavigation(
  withPhoneService(
    connect(
      null,
      mapDispatchToProps
    )(DisconnectForm)
  )
);
