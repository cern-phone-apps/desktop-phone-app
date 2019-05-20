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

const clearRecentCallsAction = async clearRecentCalls => {
  console.log(`Claring recent calls`);
  clearRecentCalls();
};

const clearRecentCallsFunc = clearRecentCalls => {
  Alert.alert(
    'Clear Recent calls',
    'Are you sure you want to clear all the recent calls?',
    [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          clearRecentCallsAction(clearRecentCalls);
        }
      }
    ]
  );
};

const RecentCallsMenu = ({ clearRecentCalls }) => (
  <HeaderButtons
    OverflowIcon={<Icon name="md-more" size={23} color="white" />}
    HeaderButtonComponent={IoniconsHeaderButton}
  >
    <Item
      title="Clear all"
      onPress={() => clearRecentCallsFunc(clearRecentCalls)}
      show="never"
    />
  </HeaderButtons>
);

RecentCallsMenu.propTypes = {
  clearRecentCalls: PropTypes.func.isRequired
};

export default RecentCallsMenu;
