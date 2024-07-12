import React from 'react';
import { ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../../screens';
import MainStackNavigator from '../main-stack/MianStackNavigator';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Splash: 'splash',
      Main: {
        path: 'main',
        screens: {
          Detail: 'detail',
          Login: 'login',
          Drawer: {
            path: 'drawer',
            screens: {
              Home: 'home',
              Profile: 'profile'
            }
          }
        }
      }
    },
  },
};

const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />} >
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
