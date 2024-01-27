// import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {RootStackScreenProps} from '@/navigator/types';
import {Box, CustomInput, Pressable, PrimaryButton, Text} from '@/components';
import {useAppDispatch} from '@/hooks';
import {setUserDetails} from '@/store/authSlice';

const SignupScreen = ({navigation}: RootStackScreenProps<'SignupScreen'>) => {
  const dispatch = useAppDispatch();

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const firbaseSignup = (data: {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
  }) => {
    dispatch(setUserDetails(data));
    navigation.navigate('CreateAccountScreen');
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
      phonenumber: '',
      firstname: '',
      lastname: '',
    },
  });

  return (
    <Box
      paddingHorizontal="md"
      justifyContent="center"
      flex={1}
      backgroundColor="background">
      <Text variant="bold24" color="blackTint">
        Create an account
      </Text>

      <Box marginTop="lg" flexDirection="row" justifyContent="space-between">
        <Box width={'48%'}>
          <CustomInput
            placeholder="Enter first name"
            control={control}
            name="firstname"
            label="First name"
            rules={{
              required: 'Name is required',
              maxLength: {
                value: 100,
                message: 'Maximum of 100 characters',
              },
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: 'Please enter a valid name',
              },
            }}
            keyboardType="default"
            errorMessage={errors.firstname?.message}
          />
        </Box>

        <Box width={'48%'}>
          <CustomInput
            placeholder="Enter last name"
            control={control}
            name="lastname"
            label="Last name"
            rules={{
              required: 'Name is required',
              maxLength: {
                value: 100,
                message: 'Maximum of 100 characters',
              },
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: 'Please enter a valid name',
              },
            }}
            keyboardType="default"
            errorMessage={errors.lastname?.message}
          />
        </Box>
      </Box>

      <Box marginTop="md">
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
        />
      </Box>

      <Box marginTop="md">
        <CustomInput
          placeholder="Enter phone number"
          control={control}
          name="phonenumber"
          label="Phone number"
          rules={{
            required: 'Phone number is required',
            maxLength: {
              value: 32,
              message: 'Maximum of 32 characters',
            },
            minLength: {
              value: 7,
              message: 'Enter a valid phone number',
            },
            // pattern: {
            //   value: /^(\\+234|0)(8([01])|([79])([0]))\\d{8}$/,
            //   message: 'Enter a valid phone number',
            // },
          }}
          keyboardType="phone-pad"
          errorMessage={errors.phonenumber?.message}
        />
      </Box>

      <PrimaryButton
        label="Continue"
        onPress={handleSubmit(firbaseSignup)}
        backgroundColor="contactColor"
        labelProps={{color: 'white'}}
        variant="textColor"
        marginTop="xl"
        // isloading={isLoading}
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

export default SignupScreen;

// const styles = StyleSheet.create({});
