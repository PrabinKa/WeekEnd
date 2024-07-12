import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from '../drawer-nav/DrawerNavigator';
import {DetailedMovieScreen, LoginScreen} from '../../screens';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="Detail"
        component={DetailedMovieScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
