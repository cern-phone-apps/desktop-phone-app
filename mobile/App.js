import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreenContainer from './src/auth/screens/AuthLoadingScreen/AuthLoadingScreenContainer';
import AuthStack from './src/auth/navigators/auth';
import { AppFullStack } from './src/calls/navigators';

/**
 * We redirect the user either to the AppStack or to the Authentication Stack
 */
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreenContainer, // Redirects the user to either of the stacks
      App: AppFullStack, // Application
      Auth: AuthStack // Authentication
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
