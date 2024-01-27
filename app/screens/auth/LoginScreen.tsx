import React from 'react';
import {RootStackScreenProps} from '@/navigator/types';
import {Box, CustomInput, Pressable, PrimaryButton, Text} from '@/components';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';

const LoginScreen = ({navigation}: RootStackScreenProps<'LoginScreen'>) => {
  const toSignUp = () => navigation.navigate('SignupScreen');

  const goToResetPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const login = (data: {email: string; password: string}) => {
    console.log(data, 'data');
    navigation.navigate('BottomTabs');
  };

  const onGoogleButtonPress = async () => {
    console.log({message: 'Coming soon'});
    // // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // // Get the users ID token
    // const { idToken, user } = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log(idToken, googleCredential, user, 'googleCredential');

    // // Sign-in the user with the credential
    // return firebaseAuth.signInWithCredential(googleCredential);
  };

  const {
    control,
    formState: {errors},
    // getFieldState,
    // getValues,
    handleSubmit,
    // setError,
    // setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="md">
      <Box flex={1} justifyContent="center">
        <Text variant="bold24" color="blackTint" marginVertical="sm">
          Welcome back
        </Text>

        <CustomInput
          placeholder="Enter your email"
          control={control}
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            maxLength: {
              value: 100,
              message: 'Maximum of 100 characters',
            },
            pattern: {
              value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email',
            },
          }}
          keyboardType="email-address"
          errorMessage={errors.email?.message}
          inputContainerStyle={styles.inputcontainer}
        />

        <CustomInput
          placeholder="Enter password"
          control={control}
          name="password"
          label="Password"
          rules={{
            required: 'Password is required',
            maxLength: {
              value: 32,
              message: 'Maximum of 32 characters',
            },
            minLength: {
              value: 6,
              message: 'Password must be 6 or more alphanumeric',
            },
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'Please enter a valid password',
            },
          }}
          secureTextEntry
          errorMessage={errors.password?.message}
          inputContainerStyle={styles.inputcontainer}
        />

        <Pressable marginTop="md" onPress={goToResetPassword} type="scale">
          <Text textAlign="right" color="textBlue">
            Forgot password?
          </Text>
        </Pressable>

        <PrimaryButton
          label="Login"
          onPress={handleSubmit(login)}
          backgroundColor="contactColor"
          labelProps={{color: 'white'}}
          variant="textColor"
          marginTop="lg"
          // isloading={isLoading}
        />

        <Box
          flexDirection="row"
          marginTop="md"
          justifyContent="space-between"
          alignItems="center">
          <Box height={1} backgroundColor="border" width={'33%'} />
          <Text variant="medium14" textAlign="center" color="secondary">
            or login with
          </Text>
          <Box height={1} backgroundColor="border" width={'33%'} />
        </Box>

        <PrimaryButton
          label="Google"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with google'),
            )
          }
          backgroundColor="white"
          variant="textColor"
          borderWidth={1}
          borderColor="border"
          marginTop="md"
          icon="google"
          // isloading={isLoading}
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

const styles = StyleSheet.create({
  inputcontainer: {
    marginTop: 24,
  },
});
