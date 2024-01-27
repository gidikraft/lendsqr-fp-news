import RootNavigation from '@/navigator';
import theme from '@/theme';
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
