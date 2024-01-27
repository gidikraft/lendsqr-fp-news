import RootNavigation from '@/navigator';
import {store} from '@/store/Store';
import theme from '@/theme';
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
