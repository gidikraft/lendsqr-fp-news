import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '@/navigator/types';
import { Box, Pressable, PrimaryButton, Text } from '@/components';
import analytics from '@react-native-firebase/analytics';
// import crashlytics from '@react-native-firebase/crashlytics';
import { screenTrace } from '@/utils/screentrace';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '466884891109-2hahf5pl97vf7elq283p9cttgntj8a6q.apps.googleusercontent.com',
});

const LoginScreen = ({ navigation }: RootStackScreenProps<'LoginScreen'>) => {
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    screenTrace('LoginScreen');
  }, []);

  const toSignUp = () => navigation.navigate('SignupScreen');

  const onGoogleButtonPress = async () => {
    try {
      setIsloading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await analytics().logEvent('login', {
        id: user?.id,
        fistName: user?.givenName,
        lastName: user?.familyName,
        email: user?.email,
      });
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error, 'google signin error');
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="md">
      <Box flex={1} justifyContent="center">
        <Text variant="bold24" color="blackTint" marginVertical="sm">
          Welcome back
        </Text>

        <PrimaryButton
          label="Sign in with Google"
          onPress={onGoogleButtonPress}
          backgroundColor="white"
          variant="textColor"
          borderWidth={1}
          borderColor="border"
          marginTop="md"
          icon="google"
          isloading={isloading}
        />

        <Box flexDirection="row" justifyContent="center" marginTop="sl">
          <Text>Don't have an account?</Text>
          <Pressable type="scale" onPress={toSignUp}>
            <Text marginLeft="xs" color="textBlue">
              Sign up
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
