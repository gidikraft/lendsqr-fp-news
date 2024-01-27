import React, {useState} from 'react';
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

const CreateAccountScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'CreateAccountScreen'>) => {
  const {userdetails} = route.params;
  const [isloading, setIsloading] = useState(false);

  const {
    control,
    formState: {errors},
    // getValues,
    handleSubmit,
    // setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const createAccount = (data: {email: string; password: string}) => {
    setIsloading(true);
    setTimeout(() => {
      console.log(data, userdetails, 'ddata');
      setIsloading(false);
    }, 1500);
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

      <Box flex={1} justifyContent="center">
        <Text variant="bold24" color="blackTint">
          Create your account
        </Text>

        <Box marginTop="lg">
          <CustomInput
            placeholder="Enter new email"
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

        <Box marginTop="lg">
          <CustomInput
            placeholder="Enter your password"
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
          />
        </Box>

        <PrimaryButton
          label="Create Account"
          onPress={handleSubmit(createAccount)}
          backgroundColor="contactColor"
          labelProps={{color: 'white'}}
          variant="white"
          marginTop="xl"
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
    </Box>
  );
};

export default CreateAccountScreen;
