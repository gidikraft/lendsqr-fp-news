import React, { Component, ErrorInfo } from 'react';
import { ScrollView, Text } from 'react-native';

import Fallback from './Fallback';
import { boundaryStyles as styles } from './styles';

interface State {
  errorMessage: string;
  hasError: boolean;
  info: ErrorInfo;
}

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: '',
      hasError: false,
      info: { componentStack: '' },
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorMessage: error.message, hasError: true, info });
  }

  render() {
    if (this.state.hasError) {
      if (__DEV__) {
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text>{this.state.errorMessage}</Text>
            <Text>{this.state.info?.componentStack}</Text>
          </ScrollView>
        );
      }
      return <Fallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
