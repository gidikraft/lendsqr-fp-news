import { Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { Box, Text } from '@/components';

const AccountSummary = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  let [translateX, translateY] = [pan.x, pan.y];

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <Box paddingHorizontal="md" flex={1} backgroundColor="background">
      <Text variant="bold20" marginTop="xl">
        Account Summary
      </Text>
      <Box
        height={100}
        width={Dimensions.get('window').width}
        // backgroundColor="blue"
      >
        <Animated.View
          style={{
            ...styles.mover,
            transform: [{ translateX: translateX }, { translateY: translateY }],
          }}
          {...panResponder.panHandlers}
        />
      </Box>
    </Box>
  );
};

export default AccountSummary;

const styles = StyleSheet.create({
  mover: {
    height: 50,
    width: 50,
    position: 'absolute',
    top: 0,
    borderRadius: 25,
    zIndex: 20,
    backgroundColor: 'blue',
  },
});
