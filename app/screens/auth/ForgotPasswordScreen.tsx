import React, {useEffect, useState} from 'react';
import {
  Box,
  CustomInput,
  Icon,
  Pressable,
  PrimaryButton,
  Text,
} from '@/components';
import {RootStackScreenProps} from '@/navigator/types';
import {useForm} from 'react-hook-form';

const ForgotPasswordScreen = ({
  navigation,
}: RootStackScreenProps<'ForgotPasswordScreen'>) => {
  const [seconds, setSeconds] = useState(30);

  const resetPassword = (data: {
    newpassword: string;
    confirmpassword: string;
  }) => {
    console.log(data, 'resetPassword data');
  };

  const {
    control,
    formState: {errors},
    // getValues,
    handleSubmit,
    // setError,
  } = useForm({
    defaultValues: {
      newpassword: '',
      confirmpassword: '',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const displayTimer = () => {
    const renderSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${renderSeconds}`;
  };

  const resendCode = () => {
    console.log('data', 'data');
  };

  return (
    <Box flex={1} paddingHorizontal="md" backgroundColor="background">
      <Box flexDirection="row" alignItems="center" marginTop="md">
        <Pressable onPress={() => navigation.goBack()} type="scale">
          <Icon name="arrow_back" size={16} />
        </Pressable>
        <Text variant="medium20" marginLeft="md">
          Forgot Password
        </Text>
      </Box>

      <Box flex={1} justifyContent="center">
        <Text variant="bold24" color="blackTint">
          Reset your password
        </Text>

        <Box marginTop="lg">
          <CustomInput
            placeholder="Enter new password"
            control={control}
            name="newpassword"
            label="New password"
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
            errorMessage={errors.newpassword?.message}
          />
        </Box>

        <Box marginTop="lg">
          <CustomInput
            placeholder="Enter your password again"
            control={control}
            name="confirmpassword"
            label="Confirm password"
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
            errorMessage={errors.confirmpassword?.message}
          />
        </Box>

        <Pressable
          onPress={resendCode}
          type="scale"
          flexDirection="row"
          justifyContent="center"
          marginTop="md">
          <Text variant="regular14">Tap to resend code in</Text>
          <Text variant="medium14" marginLeft="xs" color="textBlue">
            {displayTimer()}
          </Text>
        </Pressable>

        <PrimaryButton
          label="Reset password"
          onPress={handleSubmit(resetPassword)}
          backgroundColor="contactColor"
          labelProps={{color: 'white'}}
          variant="white"
          marginTop="xl"
          // isloading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ForgotPasswordScreen;
