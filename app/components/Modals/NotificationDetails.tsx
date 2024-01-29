import React from 'react';
import Bottomsheet from '../Bottomsheet';
import Box from '../Box';
import Text from '../Text';
import Icon from '../Icons';
// import IIcon from 'react-native-vector-icons/Ionicons';

type ModalProps = {
  author: string;
  body?: string;
  closeModal: () => void;
  showModal: boolean;
  title?: string;
};

const NotificationDetails = ({
  author,
  body,
  closeModal,
  showModal,
  title,
}: ModalProps) => {
  return (
    <Bottomsheet
      showModal={showModal}
      closeModal={closeModal}
      modalHeight={300}>
      <Box
        backgroundColor="white"
        paddingHorizontal="md"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        paddingTop="md"
        paddingBottom="xxl">
        <Text variant="medium18" marginTop="md" color="primary">
          Lendsqr News
        </Text>
        <Text color="textColor" variant="medium16" marginTop="sm">
          {title}
        </Text>

        <Text marginTop="lg" color="textColor">
          {body}
        </Text>
        <Text
          marginTop="md"
          color="textColor"
          marginBottom="md"
          textAlign="right">
          Written by: {author}
        </Text>
        <Icon name="incoming" />
        {/* <IIcon name="bulb-outline" size={30} color={palette.black} style={{ alignSelf: 'flex-end', marginTop: 16}}/> */}
      </Box>
    </Bottomsheet>
  );
};

export default NotificationDetails;
