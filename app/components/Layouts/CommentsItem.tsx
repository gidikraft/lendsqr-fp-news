import React from 'react';
import Box from '../Box';
import Text from '../Text';

type CommentsItemProps = {
  body: string;
  email: string;
  name: string;
};

const CommentsItem = ({ body, email, name }: CommentsItemProps) => {
  return (
    <Box marginTop="sms">
      <Text>{`Comment: ${body}`}</Text>
      <Text variant="medium10">{`Comments by: ${name}`}</Text>
      <Text variant="medium10">{`Contact: ${email}`}</Text>
    </Box>
  );
};

export default CommentsItem;
