/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Icon} from '@/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import {NewsListingsScreen, ProfileScreen} from '@/screens/main';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="NewsListingsScreen">
      <BottomTab.Screen
        name="NewsListingsScreen"
        component={NewsListingsScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-inactive'}
              color={color}
              size={16}
            />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{
          headerShown: false,
          title: 'Events',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'transfer' : 'transfer-inactive'}
              color={color}
              size={16}
            />
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'user' : 'user-inactive'}
              color={color}
              size={16}
              fill={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
