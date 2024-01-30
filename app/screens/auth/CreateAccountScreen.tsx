import React, { useEffect, useState } from 'react';
import { Box, Icon, Pressable, PrimaryButton, Text } from '@/components';
import { RootStackScreenProps } from '@/navigator/types';
import { useAppSelector } from '@/hooks';
import { screenTrace } from '@/utils/screentrace';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { Alert, Image, StyleSheet } from 'react-native';
import LOGO from '@/assets/images/lendsqr_logo.png';

GoogleSignin.configure({
  webClientId:
    '466884891109-2hahf5pl97vf7elq283p9cttgntj8a6q.apps.googleusercontent.com',
});

const CreateAccountScreen = ({
  navigation,
}: RootStackScreenProps<'CreateAccountScreen'>) => {
  const { userData } = useAppSelector(state => state.auth);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    screenTrace('CreateAccountScreen');
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      setIsloading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await analytics().logEvent('signup', {
        id: user?.id,
        email: user?.email,
        fistName: userData.firstname,
        lastName: userData.lastname,
        phoneNumber: userData.phonenumber,
      });

      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        console.log(error, 'google signin error');
      }
    } finally {
      setIsloading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <Box flex={1} paddingHorizontal="md" backgroundColor="background">
      <Box flexDirection="row" alignItems="center" marginTop="md">
        <Pressable onPress={() => navigation.goBack()} type="scale">
          <Icon name="arrow_back" size={16} />
        </Pressable>
        <Text variant="medium20" marginLeft="md">
          Create Account
        </Text>
      </Box>
      <Image source={LOGO} style={styles.logo} />

      <Text variant="bold24" color="blackTint" marginTop="md">
        Create your account
      </Text>

      <PrimaryButton
        label="Sign in with Google"
        onPress={onGoogleButtonPress}
        backgroundColor="white"
        variant="textColor"
        borderWidth={1}
        borderColor="border"
        marginTop="xxl"
        icon="google"
        isloading={isloading}
      />

      <Box flexDirection="row" justifyContent="center" marginTop="md">
        <Text>Already have an account?</Text>
        <Pressable type="scale" onPress={goToLogin}>
          <Text marginLeft="xs" color="textBlue">
            Login instead
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 230,
    marginTop: 100,
  },
});
