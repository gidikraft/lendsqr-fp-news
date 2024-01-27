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
import {useAppSelector} from '@/hooks';
import {NewsDetailsScreen} from '@/screens/main';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const {isAuthenticated} = useAppSelector(state => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewsDetails"
              component={NewsDetailsScreen}
              options={{headerShown: false}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
