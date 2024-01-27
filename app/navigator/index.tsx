import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {
  CreateAccountScreen,
  ForgotPasswordScreen,
  LoginScreen,
  SignupScreen,
} from '@/screens/auth';
import {navigationRef} from './AppNavigation';
import BottomTabNavigator from './BottomTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BottomTabs"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
