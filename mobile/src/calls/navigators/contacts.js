import React from 'react';
import { Icon } from 'react-native-elements';

import { IconButton } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation';
import ContactsScreenContainer from '../screens/ContactsScreen/ContactsScreenContainer';
import SearchUsersScreenContainer from '../screens/SearchUsersScreen/SearchUsersScreenContainer';
import ColorPalette from '../../styles/ColorPalette';

export default createStackNavigator({
  Contacts: {
    screen: ContactsScreenContainer,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Contacts`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white',
        headerRight: (
          <IconButton
            icon="add"
            color={ColorPalette.menuActive}
            onPress={() => navigation.navigate('SearchUsers')}
          />
        ),
        headerRightContainerStyle: {
          marginRight: 10
        }
      };
    }
  },
  SearchUsers: {
    screen: SearchUsersScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white'
      },
      title: 'Search for users',
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});
