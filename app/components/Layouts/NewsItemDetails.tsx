import { StyleSheet } from 'react-native';
import React from 'react';
import Pressable from '../Pressable';
import Icon from '../Icons';
import Box from '../Box';
import Text from '../Text';

type NotificationItemProp = {
  body: string;
  itemPress?: () => void;
  title: string;
  userId: number;
};

const NewsItemDetails = ({
  body,
  title,
  itemPress,
  userId,
}: NotificationItemProp) => {
  return (
    <Pressable
      paddingVertical="ssm"
      paddingHorizontal="sl"
      backgroundColor="blueHighlight"
      flexDirection="row"
      borderRadius={8}
      width={'100%'}
      marginBottom="ssm"
      alignItems="center"
      style={styles.newsItem}
      onPress={itemPress}>
      <Icon name="profile-photo" />
      <Box marginLeft="ssm" width={'90%'}>
        <Text variant="medium14">{title}</Text>
        <Text variant="regular12" marginTop="xs">
          {body}
        </Text>
        <Text
          textAlign="right"
          variant="regular12">{`Written by: ${userId}`}</Text>
      </Box>
    </Pressable>
  );
};

export default NewsItemDetails;

const styles = StyleSheet.create({
  newsItem: {
    shadowColor: 'rgba(0,0,0,0.2',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
