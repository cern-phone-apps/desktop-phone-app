import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterScreenContainer from '../screens/RegisterScreen/RegisterScreenContainer';
import LogoutMenuContainer from '../../auth/components/LogoutMenu/LogoutMenuContainer';

const RegisterStack = createStackNavigator({
  Register: {
    screen: RegisterScreenContainer,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white'
        },
        title: `Select your number`,
        headerStyle: {
          backgroundColor: '#2196F3'
        },
        headerTintColor: 'white',
        headerRight: <LogoutMenuContainer />
      };
    }
  }
});

export default RegisterStack;
