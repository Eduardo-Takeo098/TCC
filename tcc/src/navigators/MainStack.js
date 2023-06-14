import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import HomeDrawer from './HomeDrawer';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import MapScreen from '../screens/MapScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DetailsScreen from '../screens/DetailsScreen';

const MainStack = createStackNavigator(
  {
    Preload: {
      screen: Preload,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomeDrawer: {
      screen: HomeDrawer,
      navigationOptions: {
        headerShown: false,
      },
    },
    UserScreen: {
      screen: UserScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailsScreen: {
      screen: DetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Preload',
  }
);

export default createAppContainer(MainStack);
