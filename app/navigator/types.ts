import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  CreateAccountScreen: undefined;
  NewsDetails: undefined;

  VerifyOtp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  NewsListingsScreen: undefined;
  EventsScreen: undefined;
  ProfileScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
