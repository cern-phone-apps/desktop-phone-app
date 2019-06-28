import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { Alert } from 'react-native';

const disconnectUserAction = async (logout, navigation, phoneService) => {
  console.log(`Disconnecting user`);
  phoneService.disconnectUser();
  logout();
  navigation.navigate('Auth');
};

const logoutFunc = (logout, navigation, phoneService) => {
  Alert.alert('Log out?', 'Are you sure you want to log out?', [
    {
      text: 'Cancel'
    },
    {
      text: 'Log Out',
      onPress: () => {
        disconnectUserAction(logout, navigation, phoneService);
      }
    }
  ]);
};

const LogoutListComponent = ({ logout, navigation, phoneService }) => {
  return (
    <ListItem
      key="logout"
      title="Log out"
      topDivider
      leftIcon={{ name: 'logout', type: 'material-community' }}
      onPress={() => logoutFunc(logout, navigation, phoneService)}
    />
  );
};

LogoutListComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  phoneService: PropTypes.shape({
    disconnectUser: PropTypes.func.isRequired
  }).isRequired
};

export default LogoutListComponent;
