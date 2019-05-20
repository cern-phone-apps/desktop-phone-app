import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons, {
  HeaderButton,
  Item
} from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton
    {...passMeFurther}
    IconComponent={Icon}
    iconSize={25}
    color="white"
  />
);

const disconnectUserAction = async (logout, navigation, phoneService) => {
  console.log(`Disconnecting user`);
  phoneService.disconnectUser();
  logout();
  navigation.navigate('Auth');
};

const logoutFunc = (logout, navigation, phoneService) => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {
      text: 'Cancel',
      style: 'cancel'
    },
    {
      text: 'Accept',
      onPress: () => {
        disconnectUserAction(logout, navigation, phoneService);
      }
    }
  ]);
};

const LogoutMenu = ({ logout, navigation, phoneService }) => (
  <HeaderButtons
    OverflowIcon={<Icon name="md-more" size={23} color="white" />}
    HeaderButtonComponent={IoniconsHeaderButton}
  >
    <Item
      title="Logout"
      onPress={() => logoutFunc(logout, navigation, phoneService)}
      show="never"
    />
  </HeaderButtons>
);

LogoutMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  phoneService: PropTypes.shape({
    disconnectUser: PropTypes.func.isRequired
  }).isRequired
};

export default LogoutMenu;
