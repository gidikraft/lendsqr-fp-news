import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '@/navigator/types';
import { Box, Pressable, PrimaryButton, Text } from '@/components';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { screenTrace } from '@/utils/screentrace';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LOGO from '@/assets/images/lendsqr_logo.png';
import { Image, StyleSheet } from 'react-native';

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
      crashlytics().log('User signed in.');
      await Promise.all([
        crashlytics().setUserId(user?.id),
        crashlytics().setAttributes({
          role: 'admin',
          email: user.email,
        }),
      ]);

      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        crashlytics().recordError(error?.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        crashlytics().recordError(error?.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        crashlytics().recordError(error?.message);
      } else {
        crashlytics().recordError(error?.message);
        console.log(error, 'google signin error');
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="md">
      <Image source={LOGO} style={styles.logo} />
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
        marginTop="xxxl"
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 230,
    marginTop: 100,
  },
});
