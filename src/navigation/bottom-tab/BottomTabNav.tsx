import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DiceRoller, HomeScreen, MovieCrousel} from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, heightPixel } from '../../constants';

type BottomTabNavProps = {
  route: RouteProp<ParamListBase, "Home">;
  navigation: any;
};

const Tab = createBottomTabNavigator();

const BottomTabNav: React.FC<BottomTabNavProps> = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.SURFACE,
        tabBarActiveTintColor: COLORS.WHITE,
        tabBarInactiveTintColor: COLORS.TEXT_PRIMARY,
        tabBarStyle: {
            backgroundColor: COLORS.PRIMARY,
            height: heightPixel(60),
        }
      }}>
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dice"
        component={DiceRoller}
        options={{
          tabBarLabel: 'Dice',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="dice-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carousel"
        component={MovieCrousel}
        options={{
          tabBarLabel: 'Carousel',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="movie-filter-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
