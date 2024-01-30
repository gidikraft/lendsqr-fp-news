import React from 'react';
import { Pressable } from 'react-native';
import Box from '../Box';
import Text from '../Text';
// import RNRestart from "react-native-restart";

const handleRestart = () => {
  // RNRestart.Restart();
};

function FallBack() {
  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <Text fontSize={24} marginBottom="md">
        Oops 😞!
      </Text>
      <Text fontSize={16} marginTop="lg">
        We Encountered an error,
      </Text>
      <Pressable onPress={handleRestart}>
        <Text>Restart the app</Text>
      </Pressable>
    </Box>
  );
}

export default FallBack;
