import RootNavigation from '@/navigator';
import { store } from '@/store/Store';
import theme from '@/theme';
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import {
  requestUserPermission,
  NoficationListener,
} from '@/services/notification/notification';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CodePush from 'react-native-code-push';

const App = () => {
  const fetchRemoteConfigData = async () => {
    try {
      await remoteConfig().setDefaults({
        awesome_new_feature: 'disabled',
      });
      await remoteConfig().fetch(300);
      await remoteConfig().activate();
      const config = remoteConfig().getAll();

      Object.entries(config).forEach($ => {
        const [key, entry] = $;
        console.log('Key: ', key);
        console.log('Source: ', entry.getSource());
        console.log('Value: ', entry.asString());
      });
    } catch (error) {
      console.log(error, 'remote-config error');
    }
  };

  useEffect(() => {
    crashlytics().log('App mounted.');
    fetchRemoteConfigData();
  }, []);

  useEffect(() => {
    requestUserPermission();
    NoficationListener();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default CodePush(App);
