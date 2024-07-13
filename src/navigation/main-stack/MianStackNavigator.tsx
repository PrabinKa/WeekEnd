import {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from '../drawer-nav/DrawerNavigator';
import {DetailedMovieScreen, LoginScreen} from '../../screens';
import {AppContext} from '../../context/AppContext';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const {token} = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token ? (
        <Stack.Group>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="Detail" component={DetailedMovieScreen} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
