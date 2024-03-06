import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { CreateAccountScreen, LoginScreen, SignupScreen } from '@/screens/auth';
import { navigationRef } from './AppNavigation';
import BottomTabNavigator from './BottomTabs';
import { NewsDetailsScreen } from '@/screens/main';
import analytics from '@react-native-firebase/analytics';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, PanResponder } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const timerId = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    }),
  ).current;

  const resetInactivityTimeout = useCallback(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(async () => {
      // action after user has been detected idle
      console.log('user will be signed out after 3 mins', user);
      if (user) {
        await GoogleSignin.signOut().then(() => {
          firebaseAuth.signOut();
          console.log('User signed out!');
        });
      }
    }, 180000);
  }, []);

  useEffect(() => {
    resetInactivityTimeout();
  }, [resetInactivityTimeout]);

  const routeNameRef = useRef();

  const firebaseAuth = auth();

  // Handle user state changes
  const onAuthStateChanged = (
    userState: React.SetStateAction<FirebaseAuthTypes.User | null>,
  ) => {
    setUser(userState);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    firebaseAuth.onUserChanged(fbUser => {
      if (fbUser) {
        setUser(fbUser);
      }
    });
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseAuth.onUserChanged]);

  if (initializing) {
    return null;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View {...panResponder.panHandlers} style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator>
          {user?.emailVerified ? (
            <Stack.Group>
              <Stack.Screen
                name="BottomTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewsDetails"
                component={NewsDetailsScreen}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="CreateAccountScreen"
                component={CreateAccountScreen}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default RootNavigation;
