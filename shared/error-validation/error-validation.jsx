import React from 'react';
import { Text } from '@chakra-ui/react';

const ErrorValidation = ({ ErrorValidationMessage }) => {
  return ErrorValidationMessage ? (
    <Text fontSize="xs" as="b" color="red">
      {ErrorValidationMessage}
    </Text>
  ) : null;
};

export default ErrorValidation;
